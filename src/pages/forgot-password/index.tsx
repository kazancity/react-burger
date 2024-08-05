import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { passwordResetRequest } from "../../utils/API";
import { Link, useNavigate } from "react-router-dom";
import styles from "./forgot-password.module.css";
import useForm from "../../hooks/use-form";
import { FormEvent } from "react";

export default function ForgotPasswordPage() {
  const { formData, onChangeFormData, checkFormData } = useForm({ email: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkFormData.status) {
      passwordResetRequest(formData).then((data) =>
        navigate("/reset-password", { state: { message: data.message } }),
      );
    } else {
      document
        .querySelector(`[name=${checkFormData.field}]`)
        ?.closest(".input")
        ?.classList.add("input_status_error");
    }
  };

  return (
    <main className={`${styles.main}`}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form className={`${styles.form} mt-6 mb-20`} onSubmit={handleSubmit}>
        <EmailInput
          onChange={onChangeFormData}
          value={formData.email}
          name="email"
          isIcon={false}
          placeholder="Укажите e-mail"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <span className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{" "}
        <Link className={styles.blue} to="/login">
          Войти
        </Link>
      </span>
    </main>
  );
}
