export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#FF4D00] mb-4">404</h1>
        <p className="text-white/60 mb-6">Page not found</p>
        <a
          href="/"
          className="border border-white/20 px-6 py-3 hover:border-[#FF4D00] transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}