import { useState, useEffect } from "react";
import "./App.css";
import Routes from "./Routes.tsx";
import { AppContext, AppContextType } from "./lib/contextLib";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  /*   async function handleLogout() {
    await Auth.signOut();
    localStorage.removeItem("session");
    setSession("");
    userHasAuthenticated(false);
    nav("/login");
  } */

  useEffect(() => {
    /*    onLoad();
    getSession(); */
  }, []);

  /* async function onLoad() {
    try {
      const authUser = await Auth.currentSession();
      console.log("auth cognito", authUser);
      userHasAuthenticated(true);
    } catch (e) {
      if (e == "No current user") {
        console.log("Cognito auth info: ", e);
      } else {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  } */

  const isAdminRoute = location.pathname.startsWith("/admin");
  const prefix = isAdminRoute ? "/admin" : "";

  return (
    <div>
      <nav>
        <ul className="flex flex-row">
          <li>
            <a href="/">
              <img
                src={"/logo.webp"}
                style={{ borderRadius: "50%" }}
                width={100}
                height={100}
                alt=""
              />
            </a>
          </li>

          <li>
            <a href={`${prefix}/portfolio`}>Portfolio</a>
          </li>
          <li>
            <a href={`${prefix}/tienda`}>Tienda</a>
          </li>
          <li>
            <a href={`${prefix}/blog`}>Blog</a>
          </li>
          <li>
            <a href={`${prefix}/about`}>Sobre Mi</a>
          </li>
          <li>
            <a href={`${prefix}/contacto`}>Contacto</a>
          </li>
        </ul>
      </nav>
      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
