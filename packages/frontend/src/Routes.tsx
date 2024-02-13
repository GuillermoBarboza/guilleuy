import { Route, Routes } from "react-router-dom";
import Home from "./Layouts/Home.tsx";
import Login from "./Layouts/Login.tsx";
import NotFound from "./Layouts/NotFound.tsx";
import Signup from "./Layouts/Signup.tsx";
import Notes from "./Layouts/Notes.tsx";
import Profile from "./Layouts/Profile.tsx";
import AuthenticatedRoute from "./Components/AuthenticatedRoute.tsx";
import UnauthenticatedRoute from "./Components/UnauthenticatedRoute.tsx";
import Portfolio from "./Layouts/Portfolio.tsx";
import About from "./Layouts/About.tsx";
import Blog from "./Layouts/Blog.tsx";
import Tienda from "./Layouts/Tienda.tsx";
import Contacto from "./Layouts/Contacto.tsx";
import Admin from "./Layouts/Admin.tsx";
import AdminAbout from "./Layouts/Admin/About.tsx";
import AdminBlog from "./Layouts/Admin/Blog.tsx";
import AdminTienda from "./Layouts/Admin/Tienda.tsx";
import AdminPortfolio from "./Layouts/Admin/Portfolio.tsx";
import AdminContacto from "./Layouts/Admin/Contacto.tsx";
import Producto from "./Layouts/Producto.tsx";
import AdminProducto from "./Layouts/Admin/Producto.tsx";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/profile"
        element={
          <AuthenticatedRoute>
            <Profile />
          </AuthenticatedRoute>
        }
      />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/tienda/:productSlug" element={<Producto />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route
        path="/admin/portfolio"
        element={
          <AuthenticatedRoute>
            <AdminPortfolio />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/admin/tienda"
        element={
          <AuthenticatedRoute>
            <AdminTienda />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/admin/tienda/:productSlug"
        element={
          <AuthenticatedRoute>
            <AdminProducto />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/admin/about"
        element={
          <AuthenticatedRoute>
            <AdminAbout />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AuthenticatedRoute>
            <Admin />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/admin/blog"
        element={
          <AuthenticatedRoute>
            <AdminBlog />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/admin/contacto"
        element={
          <AuthenticatedRoute>
            <AdminContacto />
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
