import express from 'express'
import connection from './db/connection.js'
import userRouter from './app/models/user/user.routes.js'
import companyRouter from './app/models/company/company.routes.js'
import jopRouter from './app/models/jop/jop.routes.js'
import appRouter from './app/models/application/application.routes.js'
import cors from "cors"

const app = express()
const port = process.env.PORT || 3000
app.use(cors())

app.use(express.json())
app.use('/users',userRouter)
app.use('/company',companyRouter)
app.use('/jop',jopRouter)
app.use('/app',appRouter)
app.get('/', (req, res) => res.send('Hello World!'))

app.use((err,req,res,next)=>{
    res.status(err.status || 500 ).json({msg:'error', error:err.message})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))