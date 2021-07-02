import { Router } from "express";
import { DesenvolvedorController } from "./controllers/DesenvolvedorController";

const router = Router();

const devController = new DesenvolvedorController();

router.get("/developers", devController.index);
router.get("/developers/:id", devController.show);
router.post("/developers", devController.create);

export { router };
