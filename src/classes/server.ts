import express, { Application } from "express";
import cors from "cors";
import colors from "colors";
import { AppStrings } from "../utils/constants/strings";
import db from "../config/database";

import usuarioRoutes from "../routes/usuario/usuario.routes";
import housesRoutes from "../routes/houses/houses.routes";
import vendorRoutes from "../routes/vendor/vendor.routes";
import CostCodesRoute from "../routes/cost_codes/cost_code.routes";
import transactionRoute from "../routes/transactions/transaction.routes"
import UserRoute from "../routes/users/users.routes"
import  BudgetRoute    from "../routes/budgets/budget.routes";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.startDBConnection();
    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares() {
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cors({}));
  }

  private initRoutes() {
    
    this.app.use("/api/houses", housesRoutes);
    this.app.use("/api/vendors",vendorRoutes);
    this.app.use("/api/cost_codes",CostCodesRoute);
    this.app.use("/api/transaction",transactionRoute);
    this.app.use("/api/user",UserRoute);
    this.app.use("/api/budgets", BudgetRoute)
  }

  private startDBConnection() {
    try {
      db.authenticate();
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      const port = `\nApp listening on port ${this.port}`;
      const db = `DB connection established: ${process.env.DB_NAME || 'Prueba'} ✔️`;
      const env = `--- NODE_ENV --- ${process.env.NODE_ENV}`;
      const version = `App version ${AppStrings.APP_VERSION}\n`;
      console.log(colors.bgCyan.black(port));
      console.log(colors.bgBlack.cyan(db));
      console.log(colors.bgBlack.cyan(env));
      console.log(colors.bgBlack.cyan(version));
    });
  }
}

export default Server;
