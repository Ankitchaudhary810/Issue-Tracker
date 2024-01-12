import express from "express"
import bodyParser from "body-parser";
import userRouter from "./routes/user"
const app = express();


app.use(express.json());
app.use(bodyParser.json());


app.use('/api', userRouter);


app.listen(3999, () => {
    console.log("Server is running");
})