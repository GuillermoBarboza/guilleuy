
import "./App.css";
import Routes from "./Routes.tsx";

function App() {
  return (
    <div>
      \<nav>
        <ul>
            <li>
                <a href="/signup">Sign-up</a>
            </li>
            <li>
                <a href="/login">Login</a>
            </li>
        </ul>
      </nav>
      <Routes />
    </div>
  );
}

export default App;