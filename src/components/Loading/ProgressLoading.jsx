const ProgressLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative w-64 h-8 bg-gray-200 rounded-full overflow-hidden">
        <div className="absolute top-0 left-0 h-full bg-blue-500 animate-progress"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
          BigEcommerce
        </div>
      </div>
    </div>
  );
};

export default ProgressLoading;
