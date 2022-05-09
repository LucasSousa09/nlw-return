import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { MailAdapter } from '../adapters/mail-adapter'

interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string,
    user_id: string
}

export class SubmitFeedBackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot, user_id } = request;

        let translatedType
        
        function translateType(){
            if(type === 'IDEA'){
                translatedType = 'Idéia'
                return
            }
            if(type === 'BUG'){
                translatedType = 'Problema'
                return
            }
            translatedType = 'Outro'
        }

        translateType()

        if(!type){
            throw new Error('Type is required.')
        }

        if(!comment){
            throw new Error('Comment is required.')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
            user_id
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="margin: 0 auto; padding:1rem; height:100%; width:100%; max-width:1080px; font-family: sans-serif; font-size:16px; background-color:#EFEDED; color: #111">`,
                `<h1 style="font-weight:bold;">Feedget</h1>`,
                screenshot ? `<img src="${screenshot}" style="border-radius:4px"  />` : '',
                `<p style="margin:0; font-weight:bold; font-size:22px; color:#707070">Tipo do feedback: <span style="color:#111">${translatedType}</span></p>`,
                `<p style="font-weight:bold; font-size:22px; color:#707070">Comentário: <span style="color:#111">${comment}</span></p>`,
                `</div>`
            ].join('\n')
        })
    }
}

