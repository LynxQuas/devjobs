import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeContextProvider from "./context/ThemContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// Dynamically import components
const AppLayout = React.lazy(() => import("./pages/AppLayout"));
const Home = React.lazy(() => import("./pages/Home"));
const JobDetailsPage = React.lazy(() => import("./pages/JobDetailsPage"));
const Admin = React.lazy(() => import("./pages/Admin"));
const PostJob = React.lazy(() => import("./components/PostJob"));
const EditPage = React.lazy(() => import("./pages/EditPage"));

const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading AppLayout...</div>}>
          <AppLayout />
        </Suspense>
      ),
      children: [
        {
          path: "/admin/login",
          element: (
            <Suspense fallback={<div>Loading Admin...</div>}>
              <Admin />
            </Suspense>
          ),
        },
        {
          path: "/admin/create",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<div>Loading PostJob...</div>}>
                <PostJob />
              </Suspense>
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
              <Suspense fallback={<div>Loading EditPage...</div>}>
                <EditPage />
              </Suspense>
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
