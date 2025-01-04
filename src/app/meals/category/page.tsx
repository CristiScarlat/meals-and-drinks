import {getMealsByCategory} from "@/api/mealDBApi";
import {MealType} from "@/types";
import Link from "next/link";
import {ImYoutube2} from "react-icons/im";
import Header from "@/components/header";


const MealsByCategory = async (props: any) => {

    const slug = await(props.params);
    let meals = null;
    try{
        const category: string = slug.category;
        meals = await getMealsByCategory(category);
    }
    catch(error) {
        console.log(error)
    }

    console.log(meals);

    return(
        <div>
            <h1>{slug.category}</h1>
            <div
                className="relative flex justify-center flex-wrap items-stretch gap-4 max-w-5xl mx-auto mb-8 py-4 rounded shadow-2xl">
                {meals?.meals.map((meal: MealType) => (
                    <div key={meal?.idMeal}
                         className="max-w-80 rounded-2xl shadow-xl transition-all bg-slate-800 cursor-pointer hover:shadow-slate-700">
                        <img src={meal?.strMealThumb} alt="meal" className="max-w-80 rounded-t-2xl"/>
                        <p className="text-slate-400 font-bold text-center p-3">{meal?.strMeal}</p>
                        <div className="flex items-center justify-between py-3 px-4">
                            <Link href={`/meals/details/${meal.idMeal}`}
                                  className="text-slate-800 bg-slate-400 p-1 rounded">Details</Link>
                            {(meal?.strYoutube && meal?.strYoutube !== "") &&
                                <a href={meal?.strYoutube} target="_blank">
                                    <ImYoutube2 size="50px" color="#94a3b8"/>
                                </a>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MealsByCategory;