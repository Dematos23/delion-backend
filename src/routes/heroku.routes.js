import { Router } from "express";
import { HerokuController } from "../controllers/heroku.controller.js";

tareaRouter.route("/heroku").get(HerokuController.seed);
