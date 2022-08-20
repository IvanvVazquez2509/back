import fs from "fs";

export class Logger {
  private static DEFAULT_LOG_PATH = "./src/logs/log.txt";
  private static LOGGER_OPTIONS = {
    flags: "a",
  };

  public static log = (data: string) => {
    const logger = fs.createWriteStream(
      Logger.DEFAULT_LOG_PATH,
      Logger.LOGGER_OPTIONS
    );
    const date = new Date().toLocaleString("es-mx");
    logger.write(date + " ----- " + data + " \n");
    logger.end();
  };
}
