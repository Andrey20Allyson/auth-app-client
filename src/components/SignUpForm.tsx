import { Form, Formik, FormikErrors } from "formik";
import { AuthField, AuthSubmitButton } from "./Auth";

export interface SignUpFormData {
  login: string;
  name: string;
  password: string;
  birthDate: string;
}

export interface SignUpFormProps {
  onSubmit(data: SignUpFormData): void;
}

export function SignUpForm(props: SignUpFormProps) {
  function validate(data: SignUpFormData): FormikErrors<SignUpFormData> {
    const errors: FormikErrors<SignUpFormData> = {};

    const birthDate = new Date(data.birthDate);
    if (
      isNaN(birthDate.getTime())
      || birthDate.getTime() > Date.now()
    ) {
      errors.birthDate = 'Data de nascimento inválida!';
    }

    if (data.name.length === 0) {
      errors.name = 'Nome não pode estar vazio!';
    }

    if (data.password.length < 6) {
      errors.password = 'Senha deve conter mais de 6 caracteres!';
    }

    if (data.login.length === 0) {
      errors.login = 'Login não pode estar vazio!';
    }

    return errors;
  }

  return (
    <Formik
      onSubmit={props.onSubmit}
      validate={validate}
      initialValues={{ birthDate: '', login: '', name: '', password: '' } satisfies SignUpFormData}
    >
      <Form className="auth-form">
        <AuthField name="name" title="Nome" />
        <AuthField name="login" title="Login" />
        <AuthField name="password" title="Senha" />
        <AuthField name="birthDate" title="Data Nasc." type="date" />
        <AuthSubmitButton title="Registrar" />
      </Form>
    </Formik>
  )
}