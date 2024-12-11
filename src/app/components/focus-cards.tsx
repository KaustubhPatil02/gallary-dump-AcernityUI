"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Cover } from "./cover";

// Card component
export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out border border-gray-300",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className={cn(
          "object-cover absolute inset-0 transition-all duration-300 ease-out",
          hovered === index ? "blur-0" : "blur-md"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium text-white">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

// Type definition for the card object
type Card = {
  title: string;
  src: string;
};

// FocusCards component
export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!cards || cards.length === 0) {
    return <p>No cards available.</p>;
  }

  return (
     <div className="bg-black">
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-0 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 via-neutral-600 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        It's Just a Gallery <br />  with <Cover> memories!!</Cover>
      </h1>
    {/* <h1 className="flex items-center justify-center text-3xl mt-14 mb-2 ">Just a gallery</h1> */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
    ))}
    </div>
    </div>

  );
}

// Example component using FocusCards with local images
const ExampleComponent = () => {
    const [cards, setCards] = useState<Card[]>([]);
    
    // Fetch cards data asynchronously
    useEffect(() => {
        const fetchData = async () => {
            const localImages = [
                { title: 'A click before exam starts', src: '/img2.jpg' },
                { title: 'Dosta', src: '/img7.jpg' },
                { title: 'Picture Perfect', src: '/img1.png' },
                { title: 'Beach Vibe hai', src: '/img5.jpg' },
                { title: 'Suit-Boot', src: '/img4.jpg' },
                { title: 'Weekends', src: '/img9.png' },
                { title: 'Work days', src: '/img10.png' },
                { title: 'Me before meets', src: '/img8.png' },
        // Add more images as needed
      ];
      setCards(localImages);
    };
    fetchData();
}, []);

return <FocusCards cards={cards} />;
};

export default ExampleComponent;