import { useFormikContext } from "formik";
import { InputHTMLAttributes, ReactNode } from "react";

export interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  name: string;
}

export function AuthField(props: AuthFieldProps) {
  const {
    title,
    name,
    className = '',
    ...rest
  } = props;

  const context = useFormikContext<Record<string, string | undefined>>();

  const error = context.errors[name];

  const hasError = context.touched[name] === true && error !== undefined;
  const isValid = context.touched[name] === true && error === undefined;
  const errorMessage: ReactNode = hasError
    ? <small className="error-message">{error}</small>
    : undefined;

  return (
    <>
      <strong>
        <label>{title}</label>
      </strong>
      <input
        className={`${className}${hasError ? ' with-error' : ''}${isValid ? ' is-valid' : ''}`}
        onChange={context.handleChange}
        onBlur={context.handleBlur}
        value={context.values[name]}
        name={name}
        {...rest} />
      {errorMessage}
    </>
  );
}

export interface AuthSubmitButtonProps {
  title: string;
}

export function AuthSubmitButton(props: AuthSubmitButtonProps) {
  const {
    title,
  } = props;

  const context = useFormikContext();

  return <input disabled={context.isSubmitting} type="submit" value={title} />;
}