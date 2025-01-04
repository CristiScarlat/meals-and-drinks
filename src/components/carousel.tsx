'use client'
import {useEffect, useRef, useState} from "react";
import { useSearchParams } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";


type ItemType = {
    imgSrc: string
    name: string
}

type PropsTypes = {
    data: ItemType[]
}

const Carousel = ({data}: PropsTypes) => {

    const [selectedIngredients, setSelectedIngrediens] = useState<string[]>([]);

    const listRef = useRef<HTMLUListElement>(null);
    const searchParams = useSearchParams();
    const paramsIngredients = searchParams.get("i");

    useEffect(() => {
        if(paramsIngredients){
            setSelectedIngrediens(paramsIngredients.split(","))
        }
    }, []);

    const handleScrollRight = () => {
        if(listRef.current?.scrollLeft !== null && listRef.current?.scrollLeft !== undefined) {
            listRef.current.scrollLeft += 320;
        }
    }

    const handleScrollLeft = () => {
        if(listRef.current?.scrollLeft !== null && listRef.current?.scrollLeft !== undefined && listRef.current?.scrollLeft > 0) {
            listRef.current.scrollLeft -= 320;
        }
    }

    const handleAddIngredient = (ingredient: string) => {
        if(!selectedIngredients.includes(ingredient)) {
            const list: string[] = [...selectedIngredients];
            list.push(ingredient);
            setSelectedIngrediens(list);
        }
    }

    const handleRemoveIngredient = (ingredient: string) => {
        if(selectedIngredients.includes(ingredient)) {
            const list: string[] = [...selectedIngredients];
            list.splice(list.indexOf(ingredient), 1);
            setSelectedIngrediens(list);
        }
    }


    return (
        <>
            <div>
                <p className="text-slate-300 text-center">
                    <span>Scroll left/right and choose multiple ingredients</span>
                    {selectedIngredients.length > 0 && <a href={`/meals/ingredients?i=${selectedIngredients.join(',')}`}
                    className="ml-1 text-slate-300 bg-slate-800 p-2 rounded">Search meals</a>}
                </p>
            </div>
        <div className="flex items-center justify-center w-full gap-4 p-4 max-w-5xl mx-auto lg:mx-auto">
            <button type="button"
                    className="items-center justify-center h-full cursor-pointer hidden md:flex"
            onClick={handleScrollLeft}>
                <IoIosArrowBack color="white" size={30}/>
            </button>
            <ul className="flex items-center gap-4 overflow-x-auto lg:overflow-x-hidden border-x border-slate-500/50 px-2" ref={listRef} style={{scrollBehavior: 'smooth'}}>
                {data.map((item: ItemType, index: number) => (
                    <li key={item.name + index}
                        className="shadow-2xl rounded p-4 self-stretch mb-4 flex flex-col justify-between cursor-pointer min-w-28 text-center"
                        onClick={() => handleAddIngredient(item.name)}>
                        <img src={item.imgSrc}
                             alt="ingredient"
                             loading="lazy"
                        />
                        <p className="text-white p-0 m-0">{item.name}</p>
                    </li>
                ))}
            </ul>
            <button type="button"
                    className="items-center justify-center h-full cursor-pointer hidden md:flex"
            onClick={handleScrollRight}>
                <IoIosArrowForward color="white" size={30}/>
            </button>
        </div>
            <div className="flex justify-start items-center gap-4 flex-wrap p-4 max-w-5xl mx-auto lg:mx-auto">
                {selectedIngredients.length > 0 && selectedIngredients.map((ingredient: string) => (
                    <span key={ingredient} className="flex items-center text-slate-300 bg-slate-800 rounded p-2">
                        {ingredient}
                        <button className="ml-4" onClick={() => handleRemoveIngredient(ingredient)}>
                            <IoMdClose color="white"/>
                        </button>
                    </span>
                ))}
            </div>
        </>
    )
}

export default Carousel;