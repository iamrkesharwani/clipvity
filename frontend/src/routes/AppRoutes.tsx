import { Route, Routes } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/home/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
