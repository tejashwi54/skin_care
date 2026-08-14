import MainLayout from "../layouts/MainLayout";
import VerifyResetOtpForm from "../components/auth/VerifyResetOtpForm";

const VerifyResetOtp = () => {
  return (
    <MainLayout>
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-lg">
          <VerifyResetOtpForm />
        </div>

      </section>
    </MainLayout>
  );
};

export default VerifyResetOtp;