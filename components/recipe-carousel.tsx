"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "./recipe-card";
import type { Recipe } from "@/types/meals";

interface RecipeCarouselProps {
  recipes: Recipe[];
}

export function RecipeCarousel({ recipes }: RecipeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set initial index to current day of week (0 = Sunday)
  useEffect(() => {
    const today = new Date().getDay();
    setCurrentIndex(today);
  }, []);

  const nextRecipe = () => {
    setCurrentIndex((prev) => (prev + 1) % recipes.length);
  };

  const previousRecipe = () => {
    setCurrentIndex((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={previousRecipe}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">{`${days[currentIndex]}'s Meal`}</h2>
        <Button variant="outline" size="icon" onClick={nextRecipe}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="transition-all duration-300 transform">
        <RecipeCard recipe={recipes[currentIndex]} />
      </div>
      <div className="flex justify-center gap-2">
        {recipes.map((_, index) => (
          <Button
            key={index}
            variant={currentIndex === index ? "default" : "outline"}
            size="icon"
            className="w-8 h-8 rounded-full"
            onClick={() => setCurrentIndex(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
