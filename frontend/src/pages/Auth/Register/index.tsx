import { useContext, useState } from "react";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";

import * as S from "../styles";

import { Link } from "react-router-dom";

import { Context } from "../../../context/UserContext";

function Register() {
    const [user, setUser] = useState({});
    const { register } = useContext(Context);
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      //pegar o valor do input e atribuir ao name
      setUser({...user, [e.target.name]: e.target.value });
    }

  const schema = Yup.object({
    name: Yup.string()
      .max(15, "O nome deve ter 15 caracteres no máximo.")
      .required("O nome é obrigatório"),
    phone: Yup.string()
      .max(20, "O telefone deve ter 20 caracteres no máximo.")
      .required("O telefone é obrigatório"),
    email: Yup.string().email("Endereço de e-mail inválido").required("O e-mail é obrigatório"),
    password: Yup.string()
      .min(6, "Senha deve ter pelo menos 6 caracteres.")
      .required("A senha é obrigatória"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "As senhas devem coincidir.")
      .required("A senha de confirmação é obrigatória."),
  });

  return (
    <S.FormContainer>
      <h1>Registrar</h1>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          password: "",
          confirmpassword: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          //enviar o usuário pro banco
          register(values);
          setSubmitting(false);
        }}
      >
            <Form>
              <ErrorMessage name="name" />
              <Field
                text="Nome"
                type="text"
                name="name"
                placeholder="Digite seu nome"
                onKeyUp={handleChange}
              />
              <ErrorMessage name="phone" />
              <Field
                text="Telefone"
                type="text"
                name="phone"
                placeholder="Digite seu telefone"
                onKeyUp={handleChange}
              />
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
              <ErrorMessage name="confirmpassword" />
              <Field
                text="Confirmação de senha"
                type="password"
                name="confirmpassword"
                placeholder="Confirme sua senha"
                onKeyUp={handleChange}
              />
              <S.FormContainerInput type="submit" value="Cadastrar" />
            </Form>
      </Formik>
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </S.FormContainer>
  );
}

export default Register;
