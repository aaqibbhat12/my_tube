
// require('dotenv').config({ path: './env' })
import app from "./app.js";

import dotenv from "dotenv"
import ConnectionDb from "./db/ConnectDb.js";

dotenv.config({
    "path": "./env"
})
ConnectionDb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`app is listening on PORT ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("database connection error ", error)
    })

