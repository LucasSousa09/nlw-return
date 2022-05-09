import { prisma } from '../../prisma'
import { FeedbacksRepository, FeedbackCreateData } from '../feedbacks-repository'

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({type, comment, screenshot, user_id}: FeedbackCreateData){
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
                user_id
            }
        })
    };
}