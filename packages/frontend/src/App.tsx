import { useState, useEffect } from "react";
import "./App.css";
import Routes from "./Routes.tsx";
import { AppContext, AppContextType } from "./lib/contextLib";
import { API, Storage, Auth } from "aws-amplify";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const nav = useNavigate();
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams();
  const [session, setSession] = useState('');
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    const token = searchParams.get('token') || localStorage.getItem("session");
    console.log(token)
    if (token) {
      localStorage.setItem("session", token);
      setSearchParams({}); // Clear URL parameters
      const user = await getUserInfo(token);
      if (user) {
        setSession(user)
        userHasAuthenticated(true);
      }
    }
    setLoading(false);
  };


  const getUserInfo = async (session) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/session`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      alert(error);
    }
  };

  async function handleLogout() {
    await Auth.signOut();
    localStorage.removeItem("session");
    setSession('');
    userHasAuthenticated(false);
    nav("/login");
  }

  useEffect(() => {
    onLoad();
    getSession();
  }, []);

  async function onLoad() {
    try {
      const authUser = await Auth.currentSession();
      console.log('auth cognito', authUser)
      userHasAuthenticated(true);
    } catch (e) {

      if (e == "No current user") {
        console.log('Cognito auth info: ', e)
      } else {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  if (loading) return <div className="container">Loading...</div>

  return (
    !isAuthenticating && (<div>
      <nav>
        <ul>
          {location.pathname !== "/" && <li>
            <a href="/">Home</a>
          </li>}
          {isAuthenticated ? (
            <>
              {location.pathname !== "/profile" && <li>
                <a href='/profile'>Profile</a>
              </li>}
              <li>
                <div>
                  <p>Welcome {session.name}!</p>
                  <img
                    src={session.picture}
                    style={{ borderRadius: "50%" }}
                    width={100}
                    height={100}
                    alt=""
                  />
                  <p>{session.email}</p>
                </div>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/signup">Sign-up</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
      >
        <Routes />
      </AppContext.Provider>
    </div>
    )
  );
}

export default App;