import { FormikErrors, Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { AuthField, AuthSubmitButton } from "./Auth";
import { SignInData } from "../dtos/sign-in";

export interface SignInFormProps {
  onSubmit(data: SignInData): void;
}

export function SignInForm(props: SignInFormProps) {
  const {
    onSubmit
  } = props;

  function validate(data: SignInData): FormikErrors<SignInData> {
    const errors: FormikErrors<SignInData> = {};

    if (data.password.length < 6) {
      errors.password = 'Senha não pode ser menor que 6 caracteres!';
    }

    if (data.login.length === 0) {
      errors.login = `Usuário não pode estar em branco!`;
    }

    return errors;
  }

  return (
    <Formik
      initialValues={{ password: '', login: '' } as SignInData}
      validate={validate}
      onSubmit={onSubmit}>
      <Form className="auth-form">
        <AuthField title="Usuário" name="login" />
        <AuthField title="Senha" name="password" type="password" />
        <section className="row">
          <AuthSubmitButton title='Entrar' />
          <Link to='/sign-up'>
            <input type="button" value="Registrar" />
          </Link>
          <Link to='/'>
            <input type="button" value="Voltar" />
          </Link>
        </section>
      </Form>
    </Formik>
  );
}