import bugImgUrl from '../../assets/bug.svg'
import ideaImgUrl from '../../assets/idea.svg'
import thoughtImgUrl from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImgUrl,
            alt:'Imagem de uma minhoquinha roxa'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImgUrl,
            alt:'Imagem de uma lâmpada incandescente acessa'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImgUrl,
            alt:'Imagem de uma núvem de pensamento azul'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes

interface WidgetFormProps {
    user_id: string;
    updateFeedbackList: (setUpdateList: boolean) => void;
}


export function WidgetForm({user_id, updateFeedbackList}: WidgetFormProps ){
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return (
        <div className=' bg-surface_primary-light dark:bg-surface_primary-dark p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
            {
                feedbackSent ? (
                    <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
                ) :
                <>
                {
                    !feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
                    ):
                    (
                        <FeedbackContentStep
                            user_id={user_id} 
                            feedbackType={feedbackType} 
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                            updateFeedbackList={updateFeedbackList} 
                        />
                    )}
                </>
            }

            <footer className='text-xs text-text_secondary-light dark:text-text_secondary-dark' >
                Feito com ♥ pela <a className='underline underline-offset-2' href="https://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}