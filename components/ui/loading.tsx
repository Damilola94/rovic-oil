export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        <div className="h-24 w-24 rounded-full border-4 border-transparent animate-spin bg-linear-to-tr from-orange-200 via-yellow-400 to-orange-100 [mask:linear-gradient(white,transparent)]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 bg-orange-200 rounded-full animate-pulse shadow-lg shadow-orange-400/40"></div>
        </div>
      </div>
    </div>
  );
}
