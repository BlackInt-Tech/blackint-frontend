import { motion } from 'motion/react';

const clients = [
  'Tesla',
  'Apple',
  'Microsoft',
  'Google',
  'Amazon',
  'Meta',
  'Netflix',
  'Spotify',
  'Adobe',
  'Salesforce',
];

export function LogoMarquee() {
  return (
    <div className="overflow-hidden py-16 border-y border-white/10">
      <motion.div
        className="flex gap-24"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...clients, ...clients, ...clients].map((client, index) => (
          <div
            key={index}
            className="text-2xl text-white/20 uppercase tracking-wider whitespace-nowrap"
            style={{ fontWeight: 700 }}
          >
            {client}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
