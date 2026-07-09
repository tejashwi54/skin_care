const PaymentMethod = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm p-8 mt-8">

      <h2 className="text-3xl font-bold text-gray-900">
        Payment Method
      </h2>

      <div className="mt-8 space-y-4">

        <label className="flex items-center gap-4 border rounded-2xl p-5 cursor-pointer hover:border-green-500">
          <input type="radio" name="payment" defaultChecked />
          <span>UPI Payment</span>
        </label>

        <label className="flex items-center gap-4 border rounded-2xl p-5 cursor-pointer hover:border-green-500">
          <input type="radio" name="payment" />
          <span>Credit / Debit Card</span>
        </label>

        <label className="flex items-center gap-4 border rounded-2xl p-5 cursor-pointer hover:border-green-500">
          <input type="radio" name="payment" />
          <span>Cash on Delivery</span>
        </label>

      </div>

    </div>
  );
};

export default PaymentMethod;