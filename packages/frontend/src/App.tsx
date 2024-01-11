import { useState, useEffect } from "react";
import "./App.css";
import Routes from "./Routes.tsx";
import { AppContext, AppContextType } from "./lib/contextLib";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const nav = useNavigate();

  async function handleLogout() {
    console.log('log out')
    await Auth.signOut();
    userHasAuthenticated(false);
    nav("/login");
  }

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      const authUser = await Auth.currentSession();
      console.log(authUser)
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  return (
     !isAuthenticating && ( <div>
      <nav>
        <ul>
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>) : (
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