export default function WhatsAppButton() {
  const phone = "919288268417";

  const message = encodeURIComponent(
    "Hi, I’m interested in your services. Can we discuss?"
  );

  return (
    <a 
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-8 right-8 z-80
        w-16 h-16
        rounded-full
        p-1

        shadow-lg

        animate-bounce-slow

        hover:scale-110
        transition-all duration-300
        "
    >
      <img
        src="https://pngmark.com/wp-content/uploads/2023/01/Whatsapp-1024x1000.png"
        alt="WhatsApp"
        className="w-full h-full object-contain"
      />
    </a>
  );
}