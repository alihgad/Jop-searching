import jwt from 'jsonwebtoken'
import main from '../../../services/sendEmail.js'


export default async (req,email) => {
    let token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 60 * 2 })
    const link = `${req.protocol}://${req.headers.host}/users/verify/${token}`

    let rftoken = jwt.sign({ email }, process.env.SECRET_KEY)
    const rflink = `${req.protocol}://${req.headers.host}/users/reVerify/${rftoken}`

    await main(email, `
        <h1>veryfiy your email</h1>
        <br/>
        <p>this link will be expered in 2 min</p>
        <br/>
        <a href=${link}>click here</a>
        <br/>
        <h1>if expierd resend</h1>
        <br/>
        <a href=${rflink}>click here to resend</a>
        
        
        `)
}