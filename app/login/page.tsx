import LoginForm from "@/components/LoginForm";
import { loginAction } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-100">
      <h1 className="text-4xl font-bold mt-10 mb-50">LOGIN</h1>
      <LoginForm onSend={loginAction} />
    </div>
  );
}