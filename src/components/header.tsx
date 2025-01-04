import {MealsHeaderData} from "@/types";
import TreeMenu from "@/components/treeMenu";
import Link from "next/link"

interface PropsTypes {
    data?: MealsHeaderData
}

const Header = async ({data}: PropsTypes) => {

    return (
            <header
                className="my-8 mx-4 max-w-5xl p-8 shadow-2xl rounded lg:mx-auto flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center justify-start gap-4">
                    <Link href="/" className="bg-slate-800 text-slate-300 p-2 rounded">Home</Link>
                    <TreeMenu data={data}/>
                </div>
                <form action="/meals">
                    <input className="p-1 rounded-l" name="search" />
                    <button className="bg-slate-800 text-slate-300 p-1 rounded-r">Search</button>
                </form>
            </header>
        )
}

export default Header;