import { useContext, useState } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";

import * as S from "../styles";

import { Link } from "react-router-dom";

import { Context } from "../../../context/UserContext";

function Login() {
    const [user, setUser] = useState({});
    const { login } = useContext(Context);
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      //pegar o valor do input e atribuir ao name
      setUser({...user, [e.target.name]: e.target.value });
    }

  const schema = Yup.object({
    email: Yup.string().email("Endereço de e-mail inválido").required("O e-mail é obrigatório"),
    password: Yup.string()
      .min(6, "Senha deve ter pelo menos 6 caracteres.")
      .required("A senha é obrigatória")
  });

  return (
    <S.FormContainer>
      <h1>Entrar</h1>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          //enviar o usuário pro banco
          login(values);
          setSubmitting(false);
        }}
      >
            <Form>
              <ErrorMessage name="email" />
              <Field
                text="E-mail"
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                onKeyUp={handleChange}
              />
              <ErrorMessage name="password" />
              <Field
                text="Senha"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                onKeyUp={handleChange}
              />
              <S.FormContainerInput type="submit" value="Entrar" />
            </Form>
      </Formik>
      <p>
        Ainda não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </S.FormContainer>
  );
}

export default Login