import mongoose from "mongoose";
import { config } from "dotenv";
config()
mongoose.connect(env.db.url)
