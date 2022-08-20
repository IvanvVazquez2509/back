export abstract class AppStrings {
  public static readonly APP_NAME = "Pruebas";
  public static readonly APP_VERSION = "v0.0.1";
  public static readonly INTERNAL_SERVER_ERROR =
    "Algo salió mal. Favor de comunicarse con su administrador.";
  // Unauth error strings
  public static readonly NO_TOKEN = "Error. No token.";
  public static readonly NO_AUTH = "Error. Falta cabecera de autorización.";
  public static readonly NO_USER = "Token no válido - Usuario no existe en BD.";
  public static readonly INACTIVE_USER = "Token no válido - Usuario inactivo.";
  public static readonly INVALID_TOKEN = "Error. Token no válido.";
  // Error strings
  public static readonly INCORRECT_EMAIL_OR_PASSWORD =
    "Email/contraseña incorrecto.";
    public static readonly INCORRECT_CURRENT_PASSWORD =
    "Contraseña actual incorrecta.";
  public static readonly USUARIO_ALREADY_REGISTERED = "Email ya registrado.";
  public static readonly INVALID_PASSWORD_LENGTH =
    "La contraseña debe de contener al menos 6 caracteres.";
  // (data: string) => 'string' + data

  //extra error messages
  public static readonly INVALID_ACCOUNT =
    "La cuenta no es correcta.";
    public static readonly INVALID_IDUSER =
    "El id de usuario no es correcto.";

  //extra success messages
  public static readonly PASSWORD_UPDATED =
  "Contraseña actualizada correctamente.";

  public static created(label: string) {
    return "Registro(s) de " + label + " creado(s).";
  }
  public static updated(label: string) {
    return "Registro(s) de " + label + " modificado(s).";
  }
  public static deleted(label: string) {
    return "Registro(s) de " + label + " borrado(s).";
  }
  public static queried(label: string) {
    return "Registro(s) de " + label + " consultado(s).";
  }
  public static isRequired(field: string) {
    return "El campo " + field + " es requerido";
  }
  public static objectDoesntExist = (id: string | number) =>
    `Registro con id ${id} no existe en la base de datos.`;
}
