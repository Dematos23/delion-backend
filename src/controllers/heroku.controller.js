import { HerokuService } from "../services/heroku.service.js";

export class HerokuController {
  static async seed(req, res) {
    try {
      const resultado = await HerokuService.seed();
      return res.status(201).json(resultado);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "CONTROLLER Error al seedear Heroku",
        content: error.message,
      });
    }
  }
}
