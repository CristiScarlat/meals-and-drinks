import {getAllMealIngredients, searchMealsByIngredients} from "@/api/mealDBApi";
import {MealIngredient, MealType} from "@/types";
import Carousel from "@/components/carousel";
import Link from "next/link";

type PageProps = {
    searchParams: Promise<{ i: string }>
}

const MealsByIngredients = async ({searchParams}: PageProps) => {

    const queryParams = await searchParams
    let ingredients: {meals: MealIngredient[]} = {meals: []};
    let meals = null;

    try{
        ingredients = await getAllMealIngredients();
    if(queryParams?.i){
            const ingredients: string = queryParams.i
            meals = await searchMealsByIngredients(ingredients)
        }
    }
    catch(err){
        console.log(err)
    }

    return(
        <div>
            <Carousel data={ingredients.meals.map((ingredient: MealIngredient) => ({
                name: ingredient.strIngredient,
                imgSrc: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`
            }))}/>
            <div
                className="relative flex justify-center flex-wrap items-stretch gap-4 max-w-5xl mx-auto mb-8 py-4 rounded shadow-2xl">
                {meals?.meals ? meals?.meals?.map((meal: MealType) => (
                    <div key={meal?.idMeal}
                         className="max-w-80 rounded-2xl shadow-xl transition-all bg-slate-800 cursor-pointer hover:shadow-slate-700">
                        <Link
                            href={`/meals/details/${meal.idMeal}${queryParams?.i ? "?search=" + queryParams?.i : ""}`}>
                            <img src={meal?.strMealThumb} alt="meal" className="max-w-80 rounded-t-2xl"/>
                        </Link>
                        <p className="text-slate-400 font-bold text-center p-3">{meal?.strMeal}</p>
                    </div>
                )) : <p className="text-slate-300">No results found</p>}
            </div>
        </div>
    )
}

export default MealsByIngredients;