import Link from "next/link";

const Home = async () => {

    return (
        <>
            <div className="flex justify-center items-center flex-wrap gap-8 h-screen p-4 max-w-5xl mx-auto">
                <Link href="/meals" className="relative flex justify-center cursor-pointer">
                    <img src="/images/home_meals.jpg" alt="meals" className="max-w-80 rounded-2xl transition-all hover:shadow-xl"/>
                    <h3 className="absolute top-2 font-bold text-slate-200 text-xl">Meals</h3>
                </Link>
                <Link href="/drinks" className="relative flex justify-center cursor-pointer">
                    <img src="/images/home_drinks.jpg" alt="drinks" className="max-w-80 rounded-2xl transition-all hover:shadow-xl"/>
                    <h3 className="absolute top-2 font-bold text-slate-200 text-xl">Drinks</h3>
                </Link>
            </div>
        </>
    );
}


export default Home;
