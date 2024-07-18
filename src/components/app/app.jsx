import {
  Page404,
  MainPage,
  LoginPage,
  OrdersPage,
  ProfilePage,
  RegisterPage,
  IngredientPage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from "../../pages";
import {
  RouteOnlyAuth,
  RouteOnlyUnAuth,
} from "../protected-route/protected-route";
import { getIngredients } from "../../services/slices/burger-ingredients-slice";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { checkUserAuth } from "../../services/slices/user-slice";
import OrderDetails from "../order-details/order-details";
import AppHeader from "../app-header/app-header";
import { useDispatch } from "react-redux";
import Modal from "../modal/modal";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={<RouteOnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<RouteOnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<RouteOnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<RouteOnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route
          path="/profile"
          element={<RouteOnlyAuth component={<ProfilePage />} />}
        >
          <Route
            path="orders"
            element={<RouteOnlyAuth component={<OrdersPage />} />}
          />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>

      {location.state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={() => navigate("/", { replace: true })}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/"
            element={
              <Modal onClose={() => navigate("/", { replace: true })}>
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
