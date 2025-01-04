import countryCodes from "@/data/countryCodes.json"

const MealDetails = async () => {

    const mealData = await getMealDetails()

    const countries: {[key: string]: string} = {}
    countryCodes.forEach((c: {Name: string, Code: string}) => countries[c.Name] = c.Code)


    return (
        <div>
            <h1>{mealData.strMeal}</h1>
            <img src={`https://flagsapi.com/JP/flat/64.png`}/>
                <div>
                    <img src={mealData.strMealThumb} alt="meal"/>
                </div>
                {JSON.stringify(mealData, null, 2)}
        </div>
)
}

export default MealDetails;


export async function getMealDetails() {
    console.log(process.env.MEAL_DB_APP_KEY)
    try{
        const res = await fetch(`https://www.themealdb.com/api/json/v2/${process.env.MEAL_DB_APP_KEY}/lookup.php?i=52772`)
        const data = await res.json()
        return data.meals[0]
    } catch (e) {
        console.log(e)
    }
}