import express from "express";
import patientService from "../services/patients";
import { toNewPatient, toNewEntryOnPatient } from '../utils';

const router = express.Router();

router.get("/", (_req, res) => {
    //res.send('Fetching all patients!');
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json(patientService.getPatientById(id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    res.send(patientService.addPatient(newPatient));
    
  } catch (error) {
    res.status(400).send((error as Error).message);
    throw error;
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const patient = patientService.getPatientById(id);
    const newEntry = toNewEntryOnPatient({ ...req.body });

    if (patient && newEntry) {
      const addedEntry = patientService.addEntryToPatient(patient, newEntry);
      res.status(201).json(addedEntry);
    }
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

export default router;