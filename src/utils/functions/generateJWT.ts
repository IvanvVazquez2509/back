import jwt from "jsonwebtoken";
import environment from "../../environment/environment";

export const generateJWT = (uuid: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uuid };
    jwt.sign(
      payload,
      environment.JWT_SECRET,
      { expiresIn: "30d" },
      (err, token) => {
        if (err) {
          reject("No se pudo generar el token.");
        } else {
          resolve(token || "");
        }
      }
    );
  });
};
