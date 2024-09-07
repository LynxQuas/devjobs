import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeContextProvider from "./context/ThemContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// Dynamically import components
import AppLayout from "./pages/AppLayout";
import Admin from "./pages/Admin";
import PostJob from "./components/PostJob";
import EditPage from "./pages/EditPage";

const Home = React.lazy(() => import("./pages/Home"));
const JobDetailsPage = React.lazy(() => import("./pages/JobDetailsPage"));

const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/admin/login",
          element: <Admin />,
        },
        {
          path: "/admin/create",
          element: (
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          ),
        },
        {
          path: "/",
          element: (
            <Suspense fallback={<div>Loading Home...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/:id",
          element: (
            <Suspense fallback={<div>Loading JobDetailsPage...</div>}>
              <JobDetailsPage />
            </Suspense>
          ),
        },
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
