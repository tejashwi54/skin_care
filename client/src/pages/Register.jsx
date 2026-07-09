import MainLayout from "../layouts/MainLayout";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <MainLayout>
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-lg">
          <RegisterForm />
        </div>

      </section>
    </MainLayout>
  );
};

export default Register;