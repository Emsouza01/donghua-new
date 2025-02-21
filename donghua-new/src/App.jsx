import { useState, useRef, useEffect } from "react";
import { Home, Search, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const items = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Teste de Anime ${i + 1}`,
  description: `Descrição do projeto ${i + 1}`,
  season: 1,
  episode: i + 1,
}));

export default function App() {
  const carouselRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    scrollToIndex(0);
  }, []);

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const card = carouselRef.current.children[index];
      if (card) {
        const container = carouselRef.current;
        const scrollOffset = card.offsetLeft - container.offsetLeft - 20;
        container.scrollTo({ left: scrollOffset, behavior: "smooth" });
      }
      setFocusedIndex(index);
    }
  };

  const handleKeyDown = (event) => {
    let newIndex = focusedIndex;
    
    if (event.key === "ArrowRight" && focusedIndex < items.length - 1) {
      newIndex = focusedIndex + 1;
    } else if (event.key === "ArrowLeft" && focusedIndex > 0) {
      newIndex = focusedIndex - 1;
    }

    if (newIndex !== focusedIndex) {
      setTimeout(() => scrollToIndex(newIndex), 50); // Pequeno atraso para sincronizar foco e rolagem
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900 text-white">
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-xl font-bold">DONGHUAS</h1>
        <div className="flex gap-4">
          <Home className="w-6 h-6" />
          <Search className="w-6 h-6" />
          <Info className="w-6 h-6" />
        </div>
      </header>

      <main className="flex-1 p-4">
        <h2 className="text-2xl font-semibold">{items[focusedIndex].name}</h2>
        <p className="mt-2">{items[focusedIndex].description}</p>
        <p className="mt-1 text-sm">
          Season: {items[focusedIndex].season} | Episode: {items[focusedIndex].episode}
        </p>
      </main>

      <div className="relative w-full p-4 bg-gray-800 overflow-hidden">
        <div
          ref={carouselRef}
          className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth focus:outline-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: "20px" }}
          tabIndex={0}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="w-44 p-2 flex-shrink-0 transition-transform cursor-pointer focus:outline-none"
              animate={{
                scale: index === focusedIndex ? 1.2 : 1,
                opacity: index === focusedIndex ? 1 : 0.7,
                x: index === focusedIndex ? -10 : 0,
              }}
              transition={{ duration: 0.5 }}
              onClick={() => scrollToIndex(index)}
              tabIndex={0}
              onFocus={() => scrollToIndex(index)}
            >
              <Card>
                <CardContent>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
