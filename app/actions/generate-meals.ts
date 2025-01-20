"use server";

import { OpenAI } from "openai";
import type { MealPlan } from "@/types/meals";
import { getCurrentPlan, storePlan } from "@/utils/storage";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateWeeklyMealPlan(): Promise<MealPlan> {
  // Check if we have a current valid plan
  const currentPlan = await getCurrentPlan();
  if (currentPlan) {
    return currentPlan;
  }

  // Calculate next Sunday
  const now = new Date();
  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + (7 - now.getDay()));
  nextSunday.setHours(23, 59, 59, 999);

  const exclusion = "seafood";

  const prompt = `Generate a weekly meal plan with 7 healthy, easy-to-make dinner recipes. 
  Each recipe should use commonly available ingredients and be suitable for a balanced lifestyle.
  Exclude the following from all meals: ${exclusion}
  Format the response as a JSON object with the following structure:
  {
    "meals": [
      {
        "title": "Recipe Name",
        "ingredients": [{"name": "ingredient", "amount": "quantity", "unit": "measurement"}],
        "instructions": ["step 1", "step 2", ...],
        "prepTime": "XX mins",
        "cookTime": "XX mins",
        "servings": 4
      }
    ]
  }`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const response = JSON.parse(
    completion.choices[0].message.content || '{"meals": []}'
  );

  const newPlan: MealPlan = {
    id: Math.random().toString(36).substring(7),
    generatedAt: new Date().toISOString(),
    validUntil: nextSunday.toISOString(),
    meals: response.meals,
  };

  // Store the new plan
  await storePlan(newPlan);

  return newPlan;
}
