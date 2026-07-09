import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactInfo = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm p-8">

      <h2 className="text-3xl font-bold mb-8">
        Contact Information
      </h2>

      <div className="space-y-8">

        <div className="flex items-center gap-4">
          <FiPhone className="text-2xl text-green-600" />
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-500">+91 98765 43210</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FiMail className="text-2xl text-green-600" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-500">support@clearskin.com</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FiMapPin className="text-2xl text-green-600" />
          <div>
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-500">
              Indore, Madhya Pradesh, India
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ContactInfo;