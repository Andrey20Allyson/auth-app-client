import { useNavigate } from "react-router-dom";
import { AuthClient } from "../clients/auth";
import { SignInForm } from "../components/SignInForm";
import { SignInData } from "../dtos/sign-in";

export default function SignIn() {
  const authService = new AuthClient();
  const navigate = useNavigate();

  async function handleSubmit(data: SignInData) {
    await authService.signIn(data);

    navigate('/');
  }

  return (
    <main>
      <SignInForm onSubmit={handleSubmit} />
    </main>
  );
}