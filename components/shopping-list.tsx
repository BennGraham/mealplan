"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { MealPlan, Ingredient } from "@/types/meals"
import { convertToStoreQuantity } from "@/utils/convert-measurements"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"

interface ShoppingListProps {
  mealPlan: MealPlan
}

interface ConsolidatedIngredient extends Ingredient {
  checked: boolean
}

export function ShoppingList({ mealPlan }: ShoppingListProps) {
  // Consolidate and convert ingredients
  const consolidatedIngredients = mealPlan.meals.reduce((acc, meal) => {
    meal.ingredients.forEach((ingredient) => {
      const existing = acc.find((i) => i.name.toLowerCase() === ingredient.name.toLowerCase())

      if (existing) {
        const amount1 = Number.parseFloat(existing.amount) || 0
        const amount2 = Number.parseFloat(ingredient.amount) || 0
        const newAmount = (amount1 + amount2).toString()
        const storeQty = convertToStoreQuantity(newAmount, ingredient.unit, ingredient.name)
        existing.amount = storeQty.amount
        existing.unit = storeQty.unit
      } else {
        const storeQty = convertToStoreQuantity(ingredient.amount, ingredient.unit, ingredient.name)
        acc.push({
          name: ingredient.name,
          amount: storeQty.amount,
          unit: storeQty.unit,
          checked: false,
        })
      }
    })
    return acc
  }, [] as ConsolidatedIngredient[])

  const [ingredients, setIngredients] = useState(consolidatedIngredients)

  const toggleIngredient = (index: number) => {
    setIngredients((prev) => prev.map((ing, i) => (i === index ? { ...ing, checked: !ing.checked } : ing)))
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="shopping-list">
        <AccordionTrigger className="flex gap-2">
          <ShoppingCart className="h-5 w-5" />
          Shopping List
        </AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Items to Buy</span>
                <Button
                  variant="outline"
                  onClick={() => setIngredients((prev) => prev.map((ing) => ({ ...ing, checked: false })))}
                >
                  Reset
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`ingredient-${index}`}
                        checked={ingredient.checked}
                        onCheckedChange={() => toggleIngredient(index)}
                      />
                      <label
                        htmlFor={`ingredient-${index}`}
                        className={`flex-1 ${ingredient.checked ? "line-through text-muted-foreground" : ""}`}
                      >
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

