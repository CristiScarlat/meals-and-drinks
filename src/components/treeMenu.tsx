import {MealsHeaderData} from "@/types";
import Link from "next/link";

interface IProps {
    data?: MealsHeaderData
}

const TreeMenu = ({ data }: IProps) => {
    return(
        <div className="relative group/menu w-fit">
            <button className="bg-slate-800 text-slate-300 p-2 rounded ">Menu</button>
            <ul className="z-20 bg-slate-800 text-slate-300 p-2 hidden group-hover/menu:block absolute cursor-pointer">
                {data && [...Object.keys(data)].map((key: string, index: number) => (
                        <li key={key} className="rounded p-4 hover:bg-sky-700 group/menu-item relative">
                            {key === "ingredients" ? <a href={`/meals/${key}`}>{key}</a> : <a>{key}</a>}
                            <ul key={key+"-"+index} className="absolute hidden group-hover/menu-item:block bg-slate-800 text-slate-300 p-2 left-full top-0 max-h-80 overflow-auto">
                                {/*@ts-expect-errors too complex to define a type here*/}
                                {(Array.isArray(data[key]) && data[key].length > 0) ? data[key].map(item => (
                                    <li key={item} className="rounded p-4 hover:bg-sky-700">
                                        <Link href={`/meals/${key}?${key}=${item}`}>{item}</Link>
                                    </li>
                                )) : <li className="rounded p-4 hover:bg-sky-700">
                                    <Link href={`/meals/${key}`}>{`Search by ${key}`}</Link>
                                </li>}
                            </ul>
                        </li>
                ))}
            </ul>
        </div>
    )
}

export default TreeMenu;