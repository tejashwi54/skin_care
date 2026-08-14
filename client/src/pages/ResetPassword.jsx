import MainLayout from "../layouts/MainLayout";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <MainLayout>
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-lg">
          <ResetPasswordForm />
        </div>

      </section>
    </MainLayout>
  );
};

export default ResetPassword;