import { Routes, Route, Navigate, RouteProps, Outlet } from "react-router-dom";
import "./App.scss";
import BookingList from "./pages/BookingList";
import CarList from "./pages/CarList";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import useLogin from "./modules/useLogin";

export interface PrivateRouteProps extends RouteProps {
  redirectPath: string;
}

export const PrivateRoute = ({ redirectPath }: PrivateRouteProps) => {
  const {isLoggedIn} = useLogin();
  if (isLoggedIn()) {
    return <Outlet />;
  }
  return <Navigate to={redirectPath} />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PrivateRoute redirectPath="login" />}>
          <Route index element={<CarList />} />
          <Route path="cars" element={<CarList />} />
          <Route path="bookings" element={<BookingList />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
