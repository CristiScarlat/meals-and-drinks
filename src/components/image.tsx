'use client'
import { useState, ImgHTMLAttributes } from 'react'

const Image = (props: ImgHTMLAttributes<HTMLImageElement>) => {

    const [error, setError] = useState<boolean>(false);
    return (
        <>
            {props.src && <img {...props} onError={() => setError(true)} style={{visibility: error ? 'hidden' : 'visible'}}/>}
            {(!props?.src || error) && <div style={{width: '20rem', height: 350, background: '#000'}} className="flex items-center max-w-80 rounded-t-2xl">
                <img className="max-w-80 object-cover" src="/images/Image_not_available.png" />
            </div>}
        </>
    )
}

export default Image