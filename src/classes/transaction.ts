import db from "../config/database";

export abstract class Transaction {
  public static start() {
    return db.query("START TRANSACTION;");
  }
  public static commit() {
    return db.query("COMMIT;");
  }
  public static rollback() {
    return db.query("ROLLBACK;");
  }
}
