const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md animate-pulse">

      {/* Image */}
      <div className="w-full h-72 bg-gray-200"></div>

      {/* Content */}
      <div className="p-6">

        <div className="w-24 h-4 bg-gray-200 rounded"></div>

        <div className="mt-4 w-full h-6 bg-gray-200 rounded"></div>

        <div className="mt-2 w-3/4 h-6 bg-gray-200 rounded"></div>

        <div className="mt-6 w-28 h-6 bg-gray-200 rounded"></div>

        <div className="mt-8 w-full h-12 bg-gray-200 rounded-full"></div>

      </div>

    </div>
  );
};

export default SkeletonCard;