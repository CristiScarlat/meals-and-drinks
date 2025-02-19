import {MealArea, MealCategory, MealIngredient, MealType} from "@/types";

const baseURL = `https://www.themealdb.com/api/json/v2/${process.env.MEAL_DB_APP_KEY}`

export const searchMealsByName = async (searchTerm: string) => {
    const response: Response = await fetch(`${baseURL}/search.php?s=${searchTerm}`, {
        next: { revalidate: 3600, tags: ['caches'] },
        cache: 'force-cache',
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'cache'
        }
    });
    return await response.json();
}

export const searchMealsByIngredients = async (ingredients: string) => {
    const response: Response = await fetch(`${baseURL}/filter.php?i=${ingredients}`, {
        next: { revalidate: 3600, tags: ['caches'] },
        cache: 'force-cache',
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'cache'
        }
    });
    return await response.json();
}

export const getLatestMeals = async (): Promise<{meals: MealType[]}> => {
    const response: Response = await fetch(`${baseURL}/latest.php`, {
        next: { revalidate: 3600, tags: ['caches'] },
        cache: 'force-cache',
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'cache'
        }
    });
    return await response.json();
}

export const getMealById = async (mealId: string): Promise<{meals: MealType[]}> => {
    const response: Response = await fetch(`${baseURL}/lookup.php?i=${mealId}`, {
        next: { revalidate: 3600, tags: ['caches'] },
        cache: 'force-cache',
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'cache'
        }
    });
    return await response.json();
}

export const getAllMealCategories = async (): Promise<{meals: MealCategory[]}> => {
    const response: Response = await fetch(`${baseURL}/list.php?c=list`, {
        next: { revalidate: 3600, tags: ['caches'] },
        cache: 'force-cache',
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'cache'
        }
    });
    return await response.json();
}

export const getAllMealAreas = async (): Promise<{meals: MealArea[]}> => {
    const response: Response = await fetch(`${baseURL}/list.php?a=list`, {
        next: { revalidate: 3600, tags: ['caches'] },
        cache: 'force-cache',
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'cache'
        }
    });
    return await response.json();
}

export const getAllMealIngredients = async (): Promise<{meals: MealIngredient[]}> => {
    const response: Response = await fetch(`${baseURL}/list.php?i=list`, {
        next: { revalidate: 3600, tags: ['caches'] },
        cache: 'force-cache',
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'cache'
        }
    });
    return await response.json();
}

export const getMealsByCategory = async (category: string): Promise<{meals: MealType[]}> => {
    const response: Response = await fetch(`${baseURL}/filter.php?c=${category}`, {
        next: { revalidate: 3600, tags: ['caches'] },
        cache: 'force-cache',
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'cache'
        }
    });
    return await response.json();
}

export const getMealsByArea = async (area: string): Promise<{meals: MealType[]}> => {
    const response: Response = await fetch(`${baseURL}/filter.php?a=${area}`, {
        next: { revalidate: 3600, tags: ['caches'] },
        cache: 'force-cache',
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'cache'
        }
    });
    return await response.json();
}