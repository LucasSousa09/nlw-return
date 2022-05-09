import axios from "axios";
import { prisma } from "../prisma";
import { sign } from "jsonwebtoken";

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    login: string,
    id: number,
    name: string,
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        })

        const response = await axios.get<IUserResponse>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        const { login, id, name } = response.data

        // Pesquisa no banco de dados se o usuário existe
        let user = await prisma.user.findFirst({
            where: {
                github_id: id
            }
        })
        // Se o usuário não existe cria um novo usuário
        if (!user) {
            user = await prisma.user.create({
                data: {
                    github_id: id,
                    login,
                    name
                }
            })
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    id: user.id
                }
            },
            "8095993b765aac80ef7f25cd210d5245",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )


        return { token, user };
    }
}

export { AuthenticateUserService }