function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-600 font-medium text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
