import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Drawer } from './components/Drawer';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { Appointments } from './pages/Appointments';
import { Prescriptions } from './pages/Prescriptions';
import { Pharmacy } from './pages/Pharmacy';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Drawer />}
      <div className={user ? 'lg:ml-64' : ''}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute>
                <Appointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/prescriptions"
            element={
              <PrivateRoute>
                <Prescriptions />
              </PrivateRoute>
            }
          />
          <Route
            path="/pharmacy"
            element={
              <PrivateRoute>
                <Pharmacy />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;