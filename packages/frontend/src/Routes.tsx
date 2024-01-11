import { Route, Routes } from "react-router-dom";
import Home from "./Layouts/Home.tsx";
import Login from "./Layouts/Login.tsx";
import NotFound from "./Layouts/NotFound.tsx";
import Signup from "./Layouts/Signup.tsx";
import Create from "./Layouts/Create.tsx";
import Notes from "./Layouts/Notes.tsx";
import AuthenticatedRoute from "./Components/AuthenticatedRoute.tsx";
import UnauthenticatedRoute from "./Components/UnauthenticatedRoute.tsx";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/notes/new"
        element={
          <AuthenticatedRoute>
            <Create />
          </AuthenticatedRoute>
        }
      />

      <Route
        path="/notes/:id"
        element={
          <AuthenticatedRoute>
            <Notes />
          </AuthenticatedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}