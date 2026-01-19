import express from "express";
import { addJournal, getJournals, deleteJournal } from "../controllers/journalController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuth, addJournal);
router.get("/", isAuth, getJournals);
router.delete("/:id", isAuth, deleteJournal);

export default router;