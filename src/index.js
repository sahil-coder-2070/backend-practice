// require('dotenv').config({ path: 'env' })
import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
});



connectDB()
    .then(() => {
        const server = app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running at port: ${process.env.PORT}`);
        })
        server.on('error', (error) => {
            console.error(error);
            process.exit(1)
        })
    })
    .catch((err) => {
        console.log(`Mongo db connection fail : ${err}`);
    })

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error", () => {
//             console.log("ERROR", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error('error:', error);
//         throw err
//     }
// })
