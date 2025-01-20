import { promises as fs } from "fs"
import path from "path"
import type { MealPlan } from "@/types/meals"

const storagePath = path.join(process.cwd(), "data")
const mealPlanFile = path.join(storagePath, "current-plan.json")

export async function getCurrentPlan(): Promise<MealPlan | null> {
  try {
    await fs.mkdir(storagePath, { recursive: true })
    const data = await fs.readFile(mealPlanFile, "utf8")
    const plan: MealPlan = JSON.parse(data)

    // Check if plan is expired (past Sunday)
    const validUntil = new Date(plan.validUntil)
    if (validUntil < new Date()) {
      return null
    }

    return plan
  } catch {
    return null
  }
}

export async function storePlan(plan: MealPlan): Promise<void> {
  await fs.mkdir(storagePath, { recursive: true })
  await fs.writeFile(mealPlanFile, JSON.stringify(plan, null, 2))
}

