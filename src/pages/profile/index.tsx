import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import { logoutUser, updateUser } from "../../services/slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/use-form";
import styles from "./profile.module.css";
import { User, Store } from "../../types";

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((store: Store) => store.user);
  const [disabled, setDisabled] = useState(true);
  const { formData, onChangeFormData, setFormData } = useForm({
    ...user,
    password: "",
  });
  const dispatch: any = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isShowButtons, setShowButtons] = useState(false);

  const handleLogout = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    dispatch(logoutUser()).then(() => navigate("/login"));
  };

  const handleIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef?.current?.focus(), 0);
  };

  const handleBlur = () => {
    setDisabled(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(formData)).then(() => {
      setFormData({ ...formData, password: "" });
      setShowButtons(false);
    });
  };

  const handleCancelClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setFormData({ ...user, password: "" });
    setShowButtons(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (user && target.value !== (user[target.name as keyof User] || "")) {
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
            autoComplete="username"
            name="email"
            isIcon={true}
          />
          <PasswordInput
            onChange={(e) => onChangeFormData(e, handleChange)}
            value={formData.password}
            autoComplete="new-password"
            name="password"
            icon="EditIcon"
          />
          {isShowButtons && (
            <div className={styles.buttons}>
              <span
                className={`${styles.cancel} ${styles.link} ${styles.inactive} mr-4`}
                onClick={handleCancelClick}
              >
                Отменить
              </span>
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
