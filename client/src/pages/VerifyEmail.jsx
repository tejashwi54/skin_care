import MainLayout from "../layouts/MainLayout";
import VerifyEmailForm from "../components/auth/VerifyEmailForm";

const VerifyEmail = () => {
  return (
    <MainLayout>
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-lg">
          <VerifyEmailForm />
        </div>

      </section>
    </MainLayout>
  );
};

export default VerifyEmail;