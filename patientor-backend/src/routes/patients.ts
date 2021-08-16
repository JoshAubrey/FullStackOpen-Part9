import express from "express";
import patientService from "../services/patients";
import toNewPatient from '../utils';

const router = express.Router();

router.get("/", (_req, res) => {
    //res.send('Fetching all patients!');
    res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json(patientService.getEntryById(id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    res.send(patientService.addEntry(newPatient));
    
  } catch (error) {
    res.status(400).send((error as Error).message);
    throw error;
  }
});

export default router;