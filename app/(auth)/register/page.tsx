import { getMe, userRegister } from "@/lib/api/clinetApi";
import { UserRegister } from "@/types/auth";
import axios from "axios";
import { Field, type FieldProps, Form, Formik, FormikHelpers } from "formik";
import css from "./registrationPage.module.css";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup";
export default function Register() {
  const router = useRouter();
  const initialValue = {
    name: "",
    email: "",
    password: "",
  };

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, "Ім'я та прізвище мають містити щонайменше 3 символи")
      .max(100, "Ім'я та прізвище не можуть містити більше ніж 100 символів")
      .matches(
        /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+ [A-Za-zА-Яа-яІіЇїЄєҐґ]+$/,
        "Введіть ім'я та прізвище через пробіл (наприклад: Іван Петров)",
      )
      .required("Вкажіть ім'я та прізвище"),

    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Введіть коректну email адресу (наприклад: user@example.com)",
      )
      .email("Введіть коректну електронну пошту")
      .required("Електронна пошта є обов'язковою"),

    password: Yup.string()
      .min(8, "Пароль має містити щонайменше 8 символів")
      .required("Пароль є обов'язковим"),
  });

  const handleSubmit = async (
    values: UserRegister,
    { setSubmitting }: FormikHelpers<UserRegister>,
  ) => {
    try {
      await userRegister(values);
      const fullUserData = await getMe();
      console.log(fullUserData);
      toast.success("Реєстрація успішна");
      router.push("/");
    } catch (error) {
      let message = "Щось пішло не так. Спробуйте ще раз.";
      if (error instanceof Error) {
        message = error.message;
      } else if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
      }
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={handleSubmit}
      validationSchema={registerValidationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="name">Name * </label>
          <Field name="name">
            {({ field, meta }: FieldProps) => (
              <>
                <input
                  placeholder="your Name"
                  type="name"
                  id="name"
                  {...field}
                  autoComplete="name"
                  className={`${css.input} ${
                    meta.touched && meta.error ? css.errorInput : ""
                  }`}
                />
                <p className={css.error}>{meta.touched ? meta.error : ""}</p>
              </>
            )}
          </Field>
          <label htmlFor="email">Email * </label>
          <Field name="email">
            {({ field, meta }: FieldProps) => (
              <>
                <input
                  placeholder="your Email"
                  type="email"
                  id="email"
                  {...field}
                  autoComplete="email"
                  className={`${css.input} ${
                    meta.touched && meta.error ? css.errorInput : ""
                  }`}
                />
                <p className={css.error}>{meta.touched ? meta.error : ""}</p>
              </>
            )}
          </Field>

          <label htmlFor="password">Password * </label>
          <Field name="password">
            {({ field, meta }: FieldProps) => (
              <>
                <input
                  type="password"
                  id="password"
                  placeholder="your Password"
                  {...field}
                  className={`${css.input} ${
                    meta.touched && meta.error ? css.errorInput : ""
                  }`}
                />
                <p className={css.error}>{meta.touched ? meta.error : ""}</p>
              </>
            )}
          </Field>
          {isSubmitting ? "Loading..." : "Register"}
          <button type="submit" disabled={isSubmitting}></button>
        </Form>
      )}
    </Formik>
  );
}
//  <label htmlFor="name">
//           Name
//           <input type="text" id="name" placeholder="your name" />
//         </label>
