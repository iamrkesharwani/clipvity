import { Route, Routes } from 'react-router-dom';
import Register from '../pages/auth/Register';

const Home = () => <div>Clipvity</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
