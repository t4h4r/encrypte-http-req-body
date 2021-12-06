import dotenv from "dotenv";
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  json,
  urlencoded
} from "express";
import helmet from "helmet";
import cors from "cors";
import { encrypt, Data } from "./utils/encryption";
import reqMiddleware from "./middlewares/reqMiddleware"

dotenv.config({ path: "./config/.env" });
const app: Express = express();
const port: number | string = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(urlencoded({extended: true}))
app.use(json());
app.use(reqMiddleware)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  const data: Data = {
    success: true,
    message: "API run correctly",
  };

  return res.status(200).send(encrypt(data));
});

app.post("/signup", (req: Request, res: Response, next: NextFunction) => {



    console.log(req.body)
    const data: Data = {
      success: true,
      message: "Operate successfully",
    };

    return res.status(201).send(encrypt(data));


});

app.listen(port, () => {
  try {
    console.log(`CORS-enabled web server listening on port ${port}`);
  } catch (err) {
    console.log("Error to connect server ", err);
    process.exit(1);
  }
});
