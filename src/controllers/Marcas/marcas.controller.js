import { MarcasService } from "../../services/marcas.service.js";
import { postMarcaDto } from "../../services/dtos/request/marcas.dto.js";
import csvtojson from "csvtojson";

export class MarcasController {
  static async postMarca(req, res) {
    try {
      const data = postMarcaDto(req.body);
      const nuevaMarca = await MarcasService.postMarca(data);
      return res.status(201).json(nuevaMarca);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "CONTROLLER Error al añadir marca",
        content: error.message,
      });
    }
  }

  static async postMarcas(req, res) {
    try {
      // const { csv } = csvtojson;
      // console.log(csvtojson.csv);
      // csv()
      //   .fromFile(req.body)
      //   .then((obj) => {
      //     console.log(obj);
      //   });
      // const marcas = "marcas";
      // console.log(marcas);
      // return marcas;
      data = req.body.map((marca) => {
        return postMarcaDto(marca);
      });
      const nuevasMarcas = await MarcasService.postMarcas(data);
      return res.status(201).json(nuevasMarcas);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "CONTROLLER Error al añadir marcas",
        content: error.message,
      });
    }
  }

  static async getMarcas(req, res) {
    try {
      //falta dto
      const marcas = await MarcasService.getMarcas(req.body);
      return res.status(200).json(marcas);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "CONTROLLER Error al pedir marcas",
        content: error.message,
      });
    }
  }

  static async deleteMarca(req, res) {
    try {
      const resultado = await MarcasService.deleteMarca(+req.params.id);
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json({
        message: "CONTROLLER Error al eliminar marca",
        content: error.message,
      });
    }
  }
}
