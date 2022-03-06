import { Router } from "express";
import { HerokuController } from "../controllers/heroku.controller.js";

export const herokuRouter = Router();

herokuRouter.route("/heroku").get(HerokuController.seed);
