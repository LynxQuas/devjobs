import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import ThemeContextProvider from "./context/ThemContext";
import Home from "./pages/Home";
import JobDetailsPage from "./pages/JobDetailsPage";
import Admin from "./pages/Admin";
import PostJob from "./components/PostJob";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditPage from "./pages/EditPage";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/admin/login", element: <Admin /> },
        {
          path: "/admin/create",
          element: (
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          ),
        },
        { path: "/", element: <Home /> },
        { path: "/:id", element: <JobDetailsPage /> },
        {
          path: "/:id/edit",
          element: (
            <ProtectedRoute>
              <EditPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
