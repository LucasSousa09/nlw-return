import { CloseButton } from "../../CloseButton"
import { FeedbackType, feedbackTypes } from ".."
import { ArrowLeft } from "phosphor-react";
import { ScreenShotButton } from "../ScreenShotButton";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { Loading } from "../../Loading";

interface FeedbackContentStepProps {
    user_id: string;
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
    updateFeedbackList: (setUpdateList: boolean) => void
}

export function FeedbackContentStep({ user_id, feedbackType, onFeedbackRestartRequested, onFeedbackSent,updateFeedbackList }: FeedbackContentStepProps){
    const [screenshot, setScreenShot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    async function handleSubmitFeedback(evt: FormEvent){
        evt.preventDefault()
        setIsSendingFeedback(true)
        updateFeedbackList(true)
        
        await api.post('/feedbacks', 
        {
            type: feedbackType,
            comment,
            screenshot,
            user_id
        })

        setIsSendingFeedback(false)
        updateFeedbackList(false)
        onFeedbackSent()
    }

    return (
        <>
            <header>
                <button onClick={onFeedbackRestartRequested} type='button' className='top-5 left-5 absolute  text-zinc-400 hover:text-zinc-100'> 
                    <ArrowLeft weight='bold' className='w-4 h-4'/>
                </button>
                <span className='flex text-xl leading-6 items-center gap-2'> 
                    <img className='w-6 h-6' src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
                    {feedbackTypeInfo.title} 
                </span>
                <CloseButton />
            </header>
            <form 
                className='my-4 w-full'
                onSubmit={handleSubmitFeedback}
            >
                <textarea 
                    className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-text_secondary-light dark:placeholder-text_secondary-dark text-text_primary-light dark:text-text_primary-dark border-stroke-light dark:border-stroke-dark bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
                    placeholder='Conte com detalhes o que está acontencendo...'
                    onChange={evt => setComment(evt.target.value)}
                />
                <footer className='flex gap-2 mt-2'>
                    <ScreenShotButton
                        screenshot={screenshot}
                        onScreenShotTook={setScreenShot}
                    />
                        <button
                            type='submit'
                            disabled={comment === '' || isSendingFeedback}
                            className='p-2 text-text_on_brand_color bg-brand-500 rounded-md border-transparent flex-1 flex items-center justify-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface_primary-light dark:focus:ring-offset-surface_primary-dark focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500'
                        >
                            { !isSendingFeedback ? 'Enviar Feedback' : <Loading /> }
                        </button>
                </footer>
            </form>
        </>
    )
}

// #NeverStopLearning