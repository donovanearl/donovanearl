import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/MarketingBanner.module.css";


const banners = [
  {
    type: "text",
    content:"Power your day without breaking the bank.",
  },
  {
    type: "text",
    content: "One Laptop. Study, Work, and Game.",
  },
    {type: "text",
    content: "Smooth Gameplay. Serious Productivity.",
  },
    {type: "text",
    content: "We pre-install, configure, and optimize Windows so you don’t have to.",
  }
];

export default function MarketingBanner() {
  const [index, setIndex] = useState(0);

  // Change banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
 console.log("styles:", styles);
  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.div
            key={index}
            initial={{ opacity: 0, x: -80, scale: 1.1 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ display: "flex", justifyContent: "center" }}
        >
            {banners[index].type === "text" ? (
            <div className={styles.text}>
                {banners[index].content}
            </div>
            ) : (
            <img
                src={banners[index].content}
                alt="Final slogan"
                className={styles.image}
            />
            )}
        </motion.div>
        </AnimatePresence>
    </div>
  );
}