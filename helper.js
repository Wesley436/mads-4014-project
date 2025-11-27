const ingredientFields = [
    "strIngredient1",
    "strIngredient2",
    "strIngredient3",
    "strIngredient4",
    "strIngredient5",
    "strIngredient6",
    "strIngredient7",
    "strIngredient8",
    "strIngredient9",
    "strIngredient10",
    "strIngredient11",
    "strIngredient12",
    "strIngredient13",
    "strIngredient14",
    "strIngredient15",
    "strIngredient16",
    "strIngredient17",
    "strIngredient18",
    "strIngredient19",
    "strIngredient20",
]

export function convertMealObject(apiMeal) {
    const meal = {}
    meal.id = apiMeal.idMeal
    meal.name = apiMeal.strMeal
    meal.category = apiMeal.strCategory
    meal.area = apiMeal.strArea
    meal.instructions = apiMeal.strInstructions
    meal.imageUrl = apiMeal.strMealThumb
    meal.youtubeUrl = apiMeal.strYoutube

    meal.ingredients = []
    meal.measures = []
    for (const [i, field] of ingredientFields.entries()) {
        if (apiMeal[field] && apiMeal[field] !== "") {
            meal.ingredients.push(apiMeal[field])
            meal.measures.push(apiMeal["strMeasure" + (i + 1)])
        }
    }
    
    return meal
}