import { SubmitFeedBackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()


const submitFeedback = new SubmitFeedBackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64slijfbasldiubaeçaer',
            user_id: 'sdbfsdkjfb-akjdbasd-9a8sdfydb'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64slijfbasldiubaeçaer',
            user_id: 'sdbfsdkjfb-akjdbasd-9a8sdfydb'
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64slijfbasldiubaeçaer',
            user_id: 'sdbfsdkjfb-akjdbasd-9a8sdfydb'
        })).rejects.toThrow()
    })

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'foto.jpg',
            user_id: 'sdbfsdkjfb-akjdbasd-9a8sdfydb'
        })).rejects.toThrow()
    })
})