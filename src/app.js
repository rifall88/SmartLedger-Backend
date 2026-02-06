import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import scheduleRoutes from "./routes/scheduleRoute.js";
import expenditureRoutes from "./routes/expenditureRoute.js";
import debtRoutes from "./routes/debtRoute.js";
import {
  startScheduler,
  startExpenditureChecker,
} from "./controllers/notifikasiController.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/api-specs.json" assert { type: "json" };

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/expenditures", expenditureRoutes);
app.use("/api/debts", debtRoutes);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

startScheduler();
startExpenditureChecker();

app.get("/", (_req, res) => {
  res.send("Welcome to the Daily Schedule API!");
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Penulisan Salah!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server ready on http://0.0.0.0:${PORT}`);
});
