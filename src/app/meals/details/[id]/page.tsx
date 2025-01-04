import {getMealById} from "@/api/mealDBApi";
import countryCodes from "@/data/countryCodes.json"
import {MealType} from "@/types";
import Link from "next/link";

type PageProps = {
    searchParams: Promise<{ b: string, v?: string, area?: string, id: string }>
}


const MealDetails = async ({searchParams}: PageProps) => {

    const queryParams = await searchParams
    let mealData: { meals: MealType[] } = {meals: []};
    try {
        mealData = await getMealById(queryParams.id);
    } catch (e) {
        console.log(e)
    }


    const renderIngredients = () => {
        let i = 1;
        const obj: { [x: string]: string } = {};
        const meal: MealType = mealData.meals[0];

        while (meal[`strIngredient${i}`]) {
            const key: string = meal[`strIngredient${i}`]
            obj[key] = meal[`strMeasure${i}`]
            i++;
        }
        return obj;
    };

    const ingredients = renderIngredients();

    const countries: { [key: string]: string } = {}
    countryCodes.forEach((c: { Name: string, Code: string }) => countries[c.Name] = c.Code)


    return (
        <div className="p-4 m-auto max-w-5xl">
            <header
                className="flex justify-between items-center my-8 mx-4 max-w-5xl p-8 shadow-2xl rounded lg:mx-auto">
                <Link href={`/meals/${queryParams.b}?${queryParams.b}=${queryParams.v}`}
                      className="bg-slate-800 p-2 rounded text-slate-300">
                    {`Back to ${queryParams.v?.toLowerCase() + " " + queryParams.b}`}
                </Link>
                <h1 className="text-center font-bold text-slate-300 text-3xl my-8">{mealData.meals[0].strMeal}</h1>
            </header>

            {/*<div></div>*/}
            {/*<img src={`https://flagsapi.com/JP/flat/64.png`}/>*/}
            <div className="flex flex-wrap justify-center gap-8 mb-3 px-4">
                <img src={mealData.meals[0].strMealThumb} alt="meal" className="max-w-80 rounded object-cover"/>
                <div className="hidden border-l-2 border-slate-500/50 md:block"></div>
                <table className="min-w-80 border-separate">
                    <thead>
                    <tr>
                        <th className="text-left bg-slate-700 text-slate-300 pl-2 rounded">Ingredient</th>
                        <th className="text-left bg-slate-800 text-slate-300 pl-2 rounded">Measure</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(ingredients).map((i) => (
                        <tr key={i}>
                            <td className="text-slate-300 bg-slate-700 pl-2 rounded">{i}</td>
                            <td className="bg-slate-800 text-slate-300 pl-2 rounded">{ingredients[i]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <pre dangerouslySetInnerHTML={{__html: mealData.meals[0].strInstructions}}
                 className="whitespace-break-spaces border-y-2 border-slate-500/50 p-4 my-4 text-slate-300"/>
        </div>
    )
}

export default MealDetails;