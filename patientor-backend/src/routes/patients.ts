import express from "express";
import patientService from "../services/patients";

const router = express.Router();

router.get("/", (_req, res) => {
    //res.send('Fetching all patients!');
    res.send(patientService.getEntries());
});

router.post('/', (_req, res) => {
    res.send('Saving a patient!');
  });

export default router;