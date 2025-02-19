import {getMealsByCategory} from "@/api/mealDBApi";
import {MealType} from "@/types";
import Link from "next/link";
import Image from "@/components/image";

type Props = {
    searchParams: Promise<{ category: string }>
}

const MealsByCategory = async ({searchParams}: Props) => {

    const queryParams: { category: string } = await(searchParams);
    let meals = null;
    try{
        const category: string | string[] | undefined = queryParams?.category;
        if(typeof category === 'string')meals = await getMealsByCategory(category);
    }
    catch(error) {
        console.log(error)
    }


    return(
        <div>
            <div
                className="relative flex justify-center flex-wrap items-stretch gap-4 max-w-5xl mx-auto mb-8 py-4 rounded shadow-2xl">
                {meals?.meals.map((meal: MealType) => (
                    <div key={meal?.idMeal}
                         className="max-w-80 rounded-2xl shadow-xl transition-all bg-slate-800 cursor-pointer hover:shadow-slate-700">
                        <Link href={`/meals/details/${meal.idMeal}?b=category&v=${queryParams?.category}`}>
                            <Image src={meal?.strMealThumb} alt="meal" className="max-w-80 rounded-t-2xl"/>
                        </Link>
                        <p className="text-slate-400 font-bold text-center p-3">{meal?.strMeal}</p>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default MealsByCategory;