import { useState } from "react";
import { FeedbackCard } from "../FeedbackCard";
import { Loading } from "../Loading";

type FeedbackList = {
    id: string,
    type: string,
    comment: string,
    screenshot?: string,
    likes?: string,
}

type FeedbacksListProps = {
    feedbackList: FeedbackList[],
    user: string | null
    isLoadingFeedbackList: boolean
}

export function FeedbacksList({feedbackList, user, isLoadingFeedbackList}: FeedbacksListProps){
    return(
        <div className='relative flex flex-col w-4/5 max-h-[500px] max-w-[800px] overflow-scroll scrollbar-none'>
            <h1 className="text-center text-xl mb-4">{user ? 'Meus feedbacks' :'Faça login para realizar comentários'}</h1>
            {            
                isLoadingFeedbackList
                ?
                <div className='w-[330px] h-10 rounded-sm mx-auto flex justify-center items-center bg-surface_secondary-light dark:bg-surface_secondary-dark'>
                    <Loading />
                </div>
                :
                feedbackList.map(feedback => <FeedbackCard type={feedback.type} comment={feedback.comment} key={feedback.id} likes={feedback.likes}/>)
            }
        </div>
    )
}