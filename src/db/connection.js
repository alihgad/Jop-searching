import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
let uri = process.env.URI
const connection = mongoose.connect(uri)
.then(()=>console.log('db connection established'))
.catch(()=>console.log('db connection error'))

export default connection