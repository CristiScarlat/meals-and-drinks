import Header from "@/components/header";
import {MealArea, MealCategory, MealsHeaderData} from "@/types";
import {getAllMealAreas, getAllMealCategories} from "@/services/mealDBApi";

type MealData = {
    meals: MealCategory[] | MealArea[];
};


const MealsLayout = async ({
                               children
                           }: Readonly<{
    children: React.ReactNode;
}>) => {

    const data: MealsHeaderData = {
        category: [],
        area: [],
        ingredients: []
    };

    try {
        const res: Array<PromiseSettledResult<MealData>> = await Promise.allSettled([
            getAllMealCategories(),
            getAllMealAreas(),
        ]);

        res.forEach((result, index) => {
            if (result.status === "fulfilled") {
                const meals = result.value.meals;

                if (index === 0) {
                    if (meals.every((meal): meal is MealCategory => 'strCategory' in meal)) {
                        data.category = meals.map(meal => meal.strCategory);
                    }
                } else if (index === 1) {
                    if (meals.every((meal): meal is MealArea => 'strArea' in meal)) {
                        data.area = meals.map(meal => meal.strArea);
                    }
                }
            } else {
                console.error(`Error in index ${index}:`, result.reason);
            }
        });
    } catch (e) {
        console.log(e)
    }

    return(
        <>
            <Header data={data}/>
            {children}
        </>
    )
}

export default MealsLayout;