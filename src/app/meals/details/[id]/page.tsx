import {getMealById} from "@/api/mealDBApi";
import countryCodes from "@/data/countryCodes.json"
import {MealType} from "@/types";
import Link from "next/link";

type PageProps = {
    params: Promise<{id: string}>
    searchParams: Promise<{ b: string, v?: string, area?: string, search?: string, i?: string }>
}


const MealDetails = async ({params, searchParams}: PageProps) => {
    const {id} = await params;
    const queryParams = await searchParams
    let mealData: { meals: MealType[] } = {meals: []};

    try {
        mealData = await getMealById(id);
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

    const renderNavigationAnchor = () => {
        if (queryParams?.b && queryParams?.v) {
            return (
                <Link href={`/meals/${queryParams.b}?${queryParams.b}=${queryParams.v}`}
                      className="bg-slate-800 p-2 rounded text-slate-300">
                    {`Back to ${queryParams.v?.toLowerCase() + " " + queryParams.b}`}
                </Link>
            )
        }
        else if (queryParams?.search) {
            return (
                <Link href={`/meals${queryParams?.search ? "?search=" + queryParams?.search : ""}`}
                      className="bg-slate-800 p-2 rounded text-slate-300">
                    {`Back to ${queryParams?.search} search results`}
                </Link>
            )
        }
        else if(queryParams?.i) {
            return (
                <Link href={`/meals?i=${queryParams?.i}`}
                  className="bg-slate-800 p-2 rounded text-slate-300">
                {`Back to search results`}
                </Link>
            )
        }
    }

    return (
        <div className="p-4 m-auto max-w-5xl">
            <div
                className="flex justify-between items-center flex-wrap my-8 mx-4 max-w-5xl px-8 lg:mx-auto">
                <div className="flex justify-between items-center gap-4">
                    {renderNavigationAnchor()}
                    {mealData.meals[0]?.strYoutube &&
                        <a href={mealData.meals[0].strYoutube}
                           target="_blank"
                           className="bg-slate-800 p-2 rounded text-slate-300">Youtube</a>}
                    {mealData.meals[0]?.strSource &&
                        <a href={mealData.meals[0].strSource}
                           target="_blank"
                           className="bg-slate-800 p-2 rounded text-slate-300">Source Link</a>}
                </div>

            </div>
            <h1 className="text-center font-bold text-slate-300 text-2xl my-8">{mealData.meals[0].strMeal}</h1>
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