import {getLatestMeals, searchMealsByIngredients, searchMealsByName} from "@/api/mealDBApi";
import {MealType} from "@/types";
import Link from "next/link";

type PageProps = {
    searchParams: Promise<{ search: string }>
}

const MealsHome = async ({searchParams}: PageProps) => {

    let meals = null;
    const queryParams: { search?: string } = await (searchParams);

    try {
        if(queryParams?.search){
            const searchTerm: string = queryParams.search;
            meals = await searchMealsByName(searchTerm);
        }
        else {
            meals = await getLatestMeals();
        }
    } catch (error) {
        console.log(error);
    }

    return (
        <>
            <div className="relative flex justify-center flex-wrap items-stretch gap-4 max-w-5xl mx-auto mb-8 py-4 rounded shadow-2xl">
                {meals?.meals ? meals?.meals?.map((meal: MealType) => (
                    <div key={meal?.idMeal}
                         className="max-w-80 rounded-2xl shadow-xl transition-all bg-slate-800 cursor-pointer hover:shadow-slate-700">
                        <Link href={`/meals/details/${meal.idMeal}${queryParams?.search ? "?search="+queryParams?.search : ""}`}>
                            <img src={meal?.strMealThumb} alt="meal" className="max-w-80 rounded-t-2xl"/>
                        </Link>
                        <p className="text-slate-400 font-bold text-center p-3">{meal?.strMeal}</p>
                    </div>
                )) : <p className="text-slate-300">No results found</p>}
            </div>
        </>
    )
}

export default MealsHome;