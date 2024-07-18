import {
  Link,
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { logoutUser, updateUser } from "../../services/slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/use-form";
import styles from "./profile.module.css";
import { useRef, useState } from "react";

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const [disabled, setDisabled] = useState(true);
  const { formData, onChangeFormData, setFormData } = useForm({
    ...user,
    password: "",
  });
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isShowButtons, setShowButtons] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser()).then(() => navigate("/login"));
  };

  const handleIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const handleBlur = () => {
    setDisabled(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData)).then(() => {
      setFormData({ ...formData, password: "" });
      setShowButtons(false);
    });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setFormData({ ...user, password: "" });
    setShowButtons(false);
  };

  const handleChange = (e) => {
    const target = e.target;
    if (target.value !== user[target.name]) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  };

  return (
    <main className={styles.main}>
      <menu className={styles.menu}>
        <li className={`${styles.item} text text_type_main-medium`}>
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive ? styles.link : `${styles.link} ${styles.inactive}`
            }
            end
          >
            Профиль
          </NavLink>
        </li>
        <li className={`${styles.item} text text_type_main-medium`}>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive ? styles.link : `${styles.link} ${styles.inactive}`
            }
            end
          >
            История заказов
          </NavLink>
        </li>
        <li className={`${styles.item} text text_type_main-medium`}>
          <span
            className={`${styles.link} ${styles.inactive}`}
            onClick={handleLogout}
          >
            Выход
          </span>
        </li>
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </menu>
      {location.pathname === "/profile" ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            onChange={(e) => onChangeFormData(e, handleChange)}
            value={formData.name}
            type="text"
            name="name"
            placeholder="Имя"
            icon="EditIcon"
            ref={inputRef}
            onIconClick={handleIconClick}
            onBlur={handleBlur}
            disabled={disabled}
          />
          <EmailInput
            onChange={(e) => onChangeFormData(e, handleChange)}
            value={formData.email}
            name="email"
            isIcon={true}
          />
          <PasswordInput
            onChange={(e) => onChangeFormData(e, handleChange)}
            value={formData.password}
            name="password"
            icon="EditIcon"
          />
          {isShowButtons && (
            <div className={styles.buttons}>
              <Link
                className={`${styles.cancel} ${styles.link} ${styles.inactive} mr-4`}
                onClick={handleCancelClick}
              >
                Отменить
              </Link>
              <Button extraClass={styles.save} htmlType="submit">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      ) : (
        <Outlet />
      )}
    </main>
  );
}
