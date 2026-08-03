import MainLayout from "../layouts/MainLayout";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <MainLayout>
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-md">

          <LoginForm />

        </div>

      </section>
    </MainLayout>
  );
};

export default Login;