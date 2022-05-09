import express from 'express'
import { prisma } from './prisma';
import { SubmitFeedBackUseCase } from './use-cases/submit-feedback-use-case';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { SendGridMailAdapter } from './adapters/sendgrid/sendgrid-mail-adapter'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';

export const router = express.Router()

router.post("/feedbacks-list", async (req,res) =>{
    const {user_id} = req.body
    try{
        const userFeedbacks = await prisma.feedback.findMany({
            where:{
                user_id: user_id
            }
        })
        return res.json(userFeedbacks)
    }
    catch(err){
        return res.json({error:err})
    }
})

router.post("/authenticate", new AuthenticateUserController().handle)

router.post('/feedbacks', async (req,res) => {
    const { type, comment, screenshot, user_id } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const sendGridMailAdapter = new SendGridMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedBackUseCase(
        prismaFeedbacksRepository,
        sendGridMailAdapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
        user_id
    })
    
    return res.status(201).send()
})