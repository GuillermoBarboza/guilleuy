import { useState, useEffect } from "react";
import "./App.css";
import Routes from "./Routes.tsx";
import { Auth } from "aws-amplify";
import { AppContext, AppContextType } from "./lib/contextLib";
import { useLocation } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [itemId, setItemId] = useState("");

  const location = useLocation();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
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
  }

  const isAdminRoute = location.pathname.startsWith("/admin");
  const prefix = isAdminRoute ? "/admin" : "";

  return (
    <>
      <MantineProvider>
        <nav className="flex justify-between items-center p-5">
          <div className="logo">
            <a href="/">
              <img
                src="/logo.webp"
                alt="Logo"
                className="w-16 h-16 rounded-full"
              />
            </a>
          </div>

          <ul className="flex items-center gap-4">
            <li>
              <a href={`${prefix}/portfolio`} className="hover:text-gray-600">
                Portfolio
              </a>
            </li>
            <li>
              <a href={`${prefix}/tienda`} className="hover:text-gray-600">
                Tienda
              </a>
            </li>
            <li>
              <a href={`${prefix}/blog`} className="hover:text-gray-600">
                Blog
              </a>
            </li>
            <li>
              <a href={`${prefix}/about`} className="hover:text-gray-600">
                Sobre Mi
              </a>
            </li>
            <li>
              <a href={`${prefix}/contacto`} className="hover:text-gray-600">
                Contacto
              </a>
            </li>
            {isAdminRoute ? (
              <li>
                <button
                  onClick={() => Auth.signOut()}
                  className="hover:text-gray-600"
                >
                  Log out
                </button>
              </li>
            ) : null}
          </ul>
        </nav>

        <AppContext.Provider
          value={
            {
              isAuthenticated,
              userHasAuthenticated,
              itemId,
              setItemId,
            } as AppContextType
          }
        >
          <Routes />
        </AppContext.Provider>
      </MantineProvider>
    </>
  );
}

export default App;
