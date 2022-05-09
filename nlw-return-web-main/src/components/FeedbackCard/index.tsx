import { FeedbackType } from '../WidgetForm'

import ideaIMG from '../../assets/idea.svg'
import bugIMG from '../../assets/bug.svg'
import thoughtIMG from '../../assets/thought.svg'

type FeedbackCardProps = {
    type: string,
    comment: string,
    likes?: string 
}

export function FeedbackCard({type, comment, likes}:FeedbackCardProps){
    return(
        <div className='bg-surface_secondary-light dark:bg-surface_secondary-dark py-2 px-4 rounded-sm mb-4'>
                {type === 'IDEA' ? 
                    (
                        <div className=" pb-2 flex justify-center items-center font-medium text-text_secondary-light dark:text-text_secondary-dark text-lg text-center border-b-2 border-stroke-light dark:border-stroke-dark mb-1">
                            <h2>Ideia</h2>
                            <img className='ml-3 w-6 h-6' src={ideaIMG} alt="Lampada incandessente acessa" />
                        </div>
                    ) : 
                    (
                        type === 'BUG' ?
                        (
                            <div className=" pb-2 flex justify-center items-center font-medium text-text_secondary-light dark:text-text_secondary-dark text-lg text-center border-b-2 border-stroke-light dark:border-stroke-dark mb-1">
                            <h2>Problema</h2>
                            <img className='ml-3 w-6 h-6' src={bugIMG} alt="Lampada incandessente acessa" />
                        </div>
                        )
                        :
                        (
                            <div className=" pb-2 flex justify-center items-center font-medium text-text_secondary-light dark:text-text_secondary-dark text-lg text-center border-b-2 border-stroke-light dark:border-stroke-dark mb-1">
                            <h2>Outro</h2>
                            <img className='ml-3 w-6 h-6' src={thoughtIMG} alt="Lampada incandessente acessa" />
                        </div>
                        )
                    ) 
                }
            <p className="text-text_secondary-light dark:text-text_secondary-dark text-sm mb-2 flex flex-col"> 
                Comentário:
                <span className='text-text_primary-light dark:text-text_primary-dark'>
                    {comment}
                </span> 
            </p>
            <p className=' text-text_secondary-light dark:text-text_secondary-dark text-sm'>
                Likes: 
                <span className='ml-2 text-text_primary-light dark:text-text_primary-dark'>
                    {likes ? likes : '0'}
                </span>
            </p>
        </div>
    )
}