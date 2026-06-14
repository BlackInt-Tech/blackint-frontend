export default function WhatsAppButton() {
  const phone = "919288268417";

  const message = encodeURIComponent(
    "Hi, I'm interested in your services. Can we discuss?"
  );

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255,77,0,0.7);
            }
            70% {
              transform: scale(1.05);
              box-shadow: 0 0 0 18px rgba(255,77,0,0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255,77,0,0);
            }
          }

          .blackint-whatsapp {
            animation: pulse 2s infinite;
          }
        `}
      </style>

      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="
          blackint-whatsapp
          fixed bottom-9 right-10 z-50
          w-12 h-12
          rounded-full
          flex items-center justify-center
          bg-[#FF4D00]
          shadow-2xl
          hover:scale-110
          transition-all duration-300
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8"
          fill="white"
        >
          <path d="M16.04 3C8.84 3 3 8.76 3 15.86c0 2.46.7 4.85 2.03 6.93L3 29l6.39-1.97a13.1 13.1 0 0 0 6.65 1.81h.01c7.19 0 13.04-5.76 13.04-12.86C29.09 8.76 23.24 3 16.04 3zm0 23.55c-2.08 0-4.11-.56-5.88-1.62l-.42-.25-3.79 1.17 1.23-3.67-.27-.44a10.5 10.5 0 0 1-1.62-5.58c0-5.87 4.84-10.64 10.79-10.64s10.79 4.77 10.79 10.64-4.84 10.39-10.83 10.39zm5.91-7.9c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16s-.82 1.04-1.01 1.25c-.18.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.57-.95-.84-1.59-1.88-1.78-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.25-.61-.51-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.63s1.14 3.04 1.3 3.25c.16.21 2.24 3.57 5.54 4.86.79.31 1.41.49 1.89.63.79.21 1.5.18 2.06.11.63-.08 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </a>
    </>
  );
}