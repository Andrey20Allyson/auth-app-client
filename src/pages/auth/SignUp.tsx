import { useNavigate } from "react-router-dom";
import { AuthClient } from "../../clients/auth";
import { SignUpForm, SignUpFormData } from "../../components/SignUpForm";
import { SignUpData } from "../../dtos/sign-up";

export default function SignUp() {
  const authService = new AuthClient();
  const navigate = useNavigate();

  async function handleSubmit(data: SignUpFormData) {
    const birthDate = new Date(data.birthDate);

    const signUpData: SignUpData = {
      ...data,
      birthDate: {
        day: birthDate.getDate(),
        month: birthDate.getMonth(),
        year: birthDate.getFullYear(),
      }
    };

    console.log(data.birthDate);

    await authService.signUp(signUpData);

    navigate('/');
  }

  return (
    <main>
      <SignUpForm onSubmit={handleSubmit} />
    </main>
  );
}