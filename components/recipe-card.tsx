import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Users } from "lucide-react";
import type { Recipe } from "@/types/meals";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription className="flex gap-4">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {recipe.prepTime} prep + {recipe.cookTime} cook
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Serves {recipe.servings}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Instructions</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
