import express from "express";
import diagnosesService from "../services/diagnoses";

const router = express.Router();

router.get("/", (_req, res) => {
    //res.send('Fetching all diagnoses!');
    res.send(diagnosesService.getEntries());
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnosis!');
  });

export default router;