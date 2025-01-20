import { generateWeeklyMealPlan } from "./actions/generate-meals"
import { ShoppingList } from "@/components/shopping-list"
import { RecipeCarousel } from "@/components/recipe-carousel"

export default async function Home() {
  const mealPlan = await generateWeeklyMealPlan()

  return (
    <main className="container mx-auto py-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Weekly Meal Plan</h1>
          <p className="text-muted-foreground">
            New meals are generated every Sunday night. Save the recipes you like!
          </p>
        </div>

        <ShoppingList mealPlan={mealPlan} />

        <div className="max-w-3xl mx-auto">
          <RecipeCarousel recipes={mealPlan.meals} />
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Generated on {new Date(mealPlan.generatedAt).toLocaleDateString()}
          <br />
          Valid until {new Date(mealPlan.validUntil).toLocaleDateString()}
        </div>
      </div>
    </main>
  )
}

