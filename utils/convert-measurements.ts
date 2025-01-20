interface StoreQuantity {
  amount: string
  unit: string
}

export function convertToStoreQuantity(amount: string, unit: string, item: string): StoreQuantity {
  const qty = Number.parseFloat(amount)

  // Conversion logic for common ingredients
  if (unit === "g" || unit === "grams") {
    if (qty <= 250) return { amount: "1", unit: "packet" }
    if (qty <= 500) return { amount: "1", unit: "500g packet" }
    return { amount: "1", unit: "1kg packet" }
  }

  if (unit === "ml" || unit === "milliliters") {
    if (qty <= 250) return { amount: "1", unit: "small bottle" }
    if (qty <= 500) return { amount: "1", unit: "500ml bottle" }
    return { amount: "1", unit: "1L bottle" }
  }

  if (unit === "tbsp" || unit === "tablespoon" || unit === "tablespoons") {
    if (item.includes("sauce") || item.includes("oil")) {
      return { amount: "1", unit: "bottle" }
    }
    if (item.includes("spice") || item.includes("seasoning")) {
      return { amount: "1", unit: "jar" }
    }
  }

  if (unit === "cup" || unit === "cups") {
    if (item.includes("flour") || item.includes("sugar")) {
      return { amount: "1", unit: "bag" }
    }
    if (item.includes("rice") || item.includes("pasta")) {
      return { amount: "1", unit: "packet" }
    }
  }

  // Default case - keep original measurement
  return { amount, unit }
}

