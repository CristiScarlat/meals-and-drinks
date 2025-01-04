'use client'

type ItemType = {
    imgSrc: string
    name: string
}

type PropsTypes = {
    data: ItemType[]
}

const Carousel = ({data}: PropsTypes) => {

    return (
        <ul className="flex items-center gap-4 px-8 overflow-auto max-w-5xl mx-auto lg:mx-auto">
            {data.map((item: ItemType) => (
                <li className="shadow-2xl rounded p-4 self-stretch mb-4">
                    <img src={`https://www.themealdb.com/images/ingredients/${item.imgSrc}-Small.png`}
                         alt="ingredient"
                         loading="lazy"
                    />
                    <a>{item.name}</a>
                </li>
            ))}
        </ul>
    )
}