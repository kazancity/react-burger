import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../../services/slices/user-slice";
import { Link, useLocation } from "react-router-dom";
import useForm from "../../hooks/use-form";
import { useDispatch } from "react-redux";
import styles from "./login.module.css";
import { FormEvent } from "react";

export default function LoginPage() {
  const { formData, onChangeFormData, checkFormData } = useForm({
    email: "",
    password: "",
  });
  const dispatch: any = useDispatch();
  const location = useLocation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isError = document.querySelector(".input__error");
    if (isError) return;

    if (checkFormData.status) {
      dispatch(loginUser(formData))
        .unwrap()
        .catch((err: Error) => {
          const error = Object.assign(document.createElement("p"), {
            className: "input__error text_type_main-default",
            textContent: err.message,
          });
          const input = document
            .querySelector('[name="password"]')
            ?.closest(".input") as HTMLInputElement;
          input.closest(".input__container")?.append(error);
          setTimeout(() => {
            error.remove();
          }, 2000);
        });
    } else {
      document
        .querySelector(`[name=${checkFormData.field}]`)
        ?.closest(".input")
        ?.classList.add("input_status_error");
    }
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
        <EmailInput
          onChange={onChangeFormData}
          value={formData.email}
          autoComplete="username"
          name="email"
          isIcon={false}
        />
        <PasswordInput
          onChange={onChangeFormData}
          value={formData.password}
          autoComplete="current-password"
          name="password"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь?{" "}
        <Link
          className={styles.blue}
          to="/register"
          state={{ from: location.state?.from }}
        >
          Зарегистрироваться
        </Link>
      </span>
      <span className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{" "}
        <Link className={styles.blue} to="/forgot-password">
          Восстановить пароль
        </Link>
      </span>
    </main>
  );
}
