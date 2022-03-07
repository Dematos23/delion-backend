import { s3 } from "../s3.js";
import { prisma } from "../prisma.js";

export class ArchivosTareaService {
  static async crearArchivo(data) {
    const tareaEncontrada = await prisma.tareas.findUnique({
      where: { id: data.tareaId },
      rejectOnNotFound: true,
    });

    if (!tareaEncontrada) {
      return {
        message: "La tarea no existe en la BD",
      };
    }

    const path = `archivos/tareas/${data.tareaId}`;
    const Key = `${path}/${data.filename}.${data.ext}`;
    const url = s3.getSignedUrl("putObject", {
      Key,
      ContentType: data.contentType,
      Bucket: process.env.AWS_BUCKET,
      Expires: +process.env.AWS_SIGNED_EXPIRES_IN,
    });

    await prisma.archivos.create({
      data: {
        url: Key,
        tareasId: data.tareaId,
        nombre: data.filename,
      },
    });
    return url;
  }

  static devolverURL(path) {
    return s3.getSignedUrl("getObject", {
      Key: path,
      Bucket: process.env.AWS_BUCKET,
      Expires: +process.env.AWS_SIGNED_EXPIRES_IN,
    });
  }

  static deleteArchivo(path) {
    s3.deleteObject(
      { Bucket: process.env.AWS_BUCKET, Key: path },
      (error, data) => {
        if (error) {
          console.log("el error es");
          console.log(error);
        }
        if (data) {
          console.log("la data es");
          console.log(data);
        }
      }
    );
  }
}
