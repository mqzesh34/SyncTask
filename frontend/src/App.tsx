import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1>Dashboard</h1>
            </ProtectedRoute>
          }
        />

        <Route path="/*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
