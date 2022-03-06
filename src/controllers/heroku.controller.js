import { main } from "../services/heroku.service.js";

export class HerokuController {
  static async seed(req, res) {
    try {
      await main();
      return res.status(201);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "CONTROLLER Error al seedear Heroku",
        content: error.message,
      });
    }
  }
}
