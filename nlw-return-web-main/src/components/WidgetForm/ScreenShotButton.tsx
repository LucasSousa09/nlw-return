import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";
import html2canvas from 'html2canvas';

interface ScreenShotButtonProps {
    screenshot:string | null
    onScreenShotTook: (screenshot: string | null) => void
}

export function ScreenShotButton({onScreenShotTook, screenshot}: ScreenShotButtonProps){
    const [isTakingScreenShot, setIsTakingScreenShot] = useState(false)

    async function handleTakeScreenShot(){
        setIsTakingScreenShot(true)

        const canvas = await html2canvas(document.querySelector('html')!)

        const base64image = canvas.toDataURL('image/png')

        onScreenShotTook(base64image)
        setIsTakingScreenShot(false)
    }

    if(screenshot){
        return(
            <button 
                type="button"
                className='shadow-lg p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-text_secondary-light dark:text-text_secondary-dark hover:text-zinc-100 transition-colors'
                onClick={() => onScreenShotTook(null)}
                style={{
                    backgroundImage: `url(${screenshot})`, 
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180,
                }}
            >
                <Trash weight='fill' className='text-zinc-400 bg-white' />
            </button>
        )
    }

    return (
        <button 
        type='button'
        onClick={handleTakeScreenShot}
        className='p-2 bg-surface_secondary-light  dark:bg-surface_secondary-dark text rounded-md border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface_primary-light dark:ring-offset-surface_primary-dark focus:ring-brand-500'
    >
        { isTakingScreenShot ? <Loading /> : <Camera className='w-6 h-6'/> }
    </button>
    )
}