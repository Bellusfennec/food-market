/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setSignIn } from "../../../store/authSlicer";
import Divider from "../../../common/components/divider/Divider";
import { Button, TextInput } from "../../../common/components/form";
import { Loading } from "../../../common/components/loading";
import { useAuth } from "../../../hooks/useAuth";
import useForm from "../../../hooks/useForm";
import style from "./Login.module.scss";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateConfig = {
    email: { isRequared: "" },
    password: { isRequared: "" },
  };
  const email = searchParams?.get("email") ? searchParams?.get("email") : "";
  const INITIAL_FORM = { email, password: "" };
  const { handlerChange, form, data } = useForm(INITIAL_FORM, validateConfig);
  const { isLoading, login, info, setInfo } = useAuth();

  const handlerSubmit = async (event) => {
    event.preventDefault();

    login(data).then((response) => {
      if (response) {
        dispatch(setSignIn(response));
        navigate(`/`);
      }
    });
  };

  useEffect(() => {
    if (info) {
      setInfo(null);
    }
  }, [form]);

  const toRegistration = () => {
    form.email.value.length > 0
      ? navigate(`/passport/registration?email=${form.email.value}`)
      : navigate(`/passport/registration`);
  };

  return (
    <form onSubmit={handlerSubmit}>
      <h3 className={style.label}>Вход</h3>
      <Divider row="2" />
      {info && (
        <>
          <p className={style.hint}>{info}</p>
          <Divider row="2" />
        </>
      )}
      <TextInput
        autoComplete={form.email.name}
        name={form.email.name}
        value={form.email.value}
        placeholder={form.email.label}
        error={form.email.error}
        onChange={handlerChange}
      />
      <Divider />
      <TextInput
        type="password"
        autoComplete={form.password.name}
        name={form.password.name}
        value={form.password.value}
        placeholder={form.password.label}
        error={form.password.error}
        onChange={handlerChange}
      />
      <Divider row="2" />
      <Button
        disabled={
          !(form.email.value.length > 0 && form.password.value.length > 0)
        }
      >
        {isLoading ? <Loading /> : "Войти"}
      </Button>
      <Divider />
      <Button type="button" outline={true} onClick={toRegistration}>
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default Login;
