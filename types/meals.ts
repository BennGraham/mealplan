export interface Ingredient {
  name: string
  amount: string
  unit: string
}

export interface Recipe {
  title: string
  ingredients: Ingredient[]
  instructions: string[]
  prepTime: string
  cookTime: string
  servings: number
}

export interface MealPlan {
  id: string
  generatedAt: string
  validUntil: string
  meals: Recipe[]
}

