import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes'

const app = express()

app.use(cors({credentials: true, origin:true}))
app.use(express.json({limit:'50mb'}))
app.use(router)

app.get("/githuboauth", (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.GITHUB_CLIENT_ID}`);
})

app.listen(process.env.PORT || 3333, () => {
    console.log('HTTP server running on PORT:3333')
})

//NewSkills
