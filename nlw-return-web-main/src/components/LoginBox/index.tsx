import { useState } from "react";
import { Loading } from "../Loading";

const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=50fb1cc622800db57414`;

interface LoginBoxProps {
    code: boolean
}

export function LoginBox({code}: LoginBoxProps){
    const [isLogingIn, setIsLogingIn] = useState(false)

    function handleLoginClick(){
        setIsLogingIn(true)
    }

    return (
        <button disabled={isLogingIn || code} className='disabled:opacity-50 disabled:pointer-events-none absolute bottom-4 right-4  md:bottom-8 md:right-8 flex flex-col min-w-[220px] w-[220px] md:w-auto'>
                    <a onClick={handleLoginClick} href={signInUrl} className='w-full flex justify-center items-center p-2 text-text_on_brand_color bg-brand-500 rounded-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface_primary-light dark:focus:ring-offset-surface_primary-dark focus:ring-brand-500 transition-colors'>
                        { code ? <Loading /> : 
                        ( isLogingIn ? <Loading /> : 'Entrar com GitHub')
                        }
                    </a>
        </button>
    )
}