
import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

//Trying to troubleshoot
class AuthenticateUserController {
    async handle(req: Request, res: Response) {

        const { code } = req.body;
        console.log(`Inside AuthenticateUserController githubcode: ${code}`)

        const service = new AuthenticateUserService();

        try {
            const result = await service.execute(code)
            console.log(`Inside AuthenticateUserController result: ${result}`)
            return res.json(result)
        } catch (err) {
            console.log(`Inside AuthenticateUserController result: ${err}`)
            return res.json({ error: err})
        }
    }
}

export { AuthenticateUserController }