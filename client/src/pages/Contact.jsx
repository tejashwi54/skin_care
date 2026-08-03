import MainLayout from "../layouts/MainLayout";
import ContactHeader from "../components/contact/ContactHeader";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

const Contact = () => {
  return (
    <MainLayout>
      <section className="py-20 bg-gray-50 min-h-screen">

        <div className="max-w-7xl mx-auto px-6">

          <ContactHeader />

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 mt-16">

            <ContactForm />

            <ContactInfo />

          </div>

        </div>

      </section>
    </MainLayout>
  );
};

export default Contact;