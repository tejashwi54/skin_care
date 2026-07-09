const BillingForm = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm p-8">

      <h2 className="text-3xl font-bold text-gray-900">
        Billing Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div>
          <label className="block mb-2 font-medium">
            First Name
          </label>

          <input
            type="text"
            placeholder="Enter first name"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Last Name
          </label>

          <input
            type="text"
            placeholder="Enter last name"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <input
            type="text"
            placeholder="Enter phone number"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
          />
        </div>

      </div>

      <div className="mt-6">

        <label className="block mb-2 font-medium">
          Address
        </label>

        <textarea
          rows="4"
          placeholder="Enter complete address"
          className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500 resize-none"
        ></textarea>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">

        <div>
          <label className="block mb-2 font-medium">
            City
          </label>

          <input
            type="text"
            placeholder="City"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            State
          </label>

          <input
            type="text"
            placeholder="State"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            PIN Code
          </label>

          <input
            type="text"
            placeholder="PIN Code"
            className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-500"
          />
        </div>

      </div>

    </div>
  );
};

export default BillingForm;