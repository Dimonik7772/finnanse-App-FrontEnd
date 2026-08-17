"use client";
import { getMe, userLogin, userRegister } from "@/lib/api/clinetApi";
import { UserLogin } from "@/types/auth";
import axios from "axios";
import { Field, type FieldProps, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import css from "./loginPage.module.css";

export default function Login() {
  const router = useRouter();
  const initialValue = {
    email: "",
    password: "",
  };
  const handleSubmit = async (
    values: UserLogin,
    { setSubmitting }: FormikHelpers<UserLogin>,
  ) => {
    try {
      await userLogin(values);
      const fullUserData = await getMe();
      console.log(fullUserData);
      router.push("/");
      toast.success("Успішний вхід");
    } catch (error) {
      let message = "Щось пішло не так. Спробуйте ще раз.";
      if (error instanceof Error) {
        message = error.message;
      }
      if (axios.isAxiosError(error)) {
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

  const loginValidationSchema = Yup.object().shape({
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

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={handleSubmit}
      validationSchema={loginValidationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
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
          {isSubmitting ? "Loading..." : "Entered"}
          <button type="submit" disabled={isSubmitting}></button>
        </Form>
      )}
    </Formik>
  );
}
