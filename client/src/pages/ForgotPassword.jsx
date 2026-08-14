import MainLayout from "../layouts/MainLayout";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <MainLayout>
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-lg">
          <ForgotPasswordForm />
        </div>

      </section>
    </MainLayout>
  );
};

export default ForgotPassword;