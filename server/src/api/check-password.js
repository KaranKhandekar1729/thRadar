import express from 'express'
import cors from 'cors'
import { super_strong } from "password-pwnd";

const app = express()

//middleware
app.use(express.json())
app.use(cors())

app.post('/check-password', async (req, res) => {
    try {
        const { password } = req.body

        const strength = await super_strong(password)

        return res.json({ result: strength })
    } catch (error) {
        console.error("error: ", error)
    }
})

app.listen(4001, () => console.log("Listening..."))