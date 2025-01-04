export interface MealType {
    idMeal: number
    strMeal: string
    strDrinkAlternate: null,
    strCategory: string
    strArea: string
    strInstructions: string
    strMealThumb: string
    strTags: string
    strYoutube: string
    [key: `strIngredient${number}`]: string
    [key: `strMeasure${number}`]: string
    strSource: string
    strImageSource: null
    strCreativeCommonsConfirmed: null
    dateModified: null
}

export interface MealCategory {
    strCategory: string
}

export interface MealArea {
    strArea: string
}

export interface MealIngredient {
    idIngredient: string
    strIngredient: string
    strDescription: string
    strType: null
}

export interface MealsHeaderData {
    category: string[]
    area: string[]
    ingredients: MealIngredient[]
}