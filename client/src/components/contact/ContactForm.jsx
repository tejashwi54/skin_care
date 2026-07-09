const ContactForm = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm p-8">
      <h2 className="text-3xl font-bold mb-8">Send Message</h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <input
          type="text"
          placeholder="Subject"
          className="w-full border rounded-xl px-5 py-4 outline-none focus:border-green-500"
        />

        <textarea
          rows="6"
          placeholder="Write your message..."
          className="w-full border rounded-xl px-5 py-4 outline-none focus:border-green-500 resize-none"
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition">
          Send Message
        </button>

      </div>
    </div>
  );
};

export default ContactForm;