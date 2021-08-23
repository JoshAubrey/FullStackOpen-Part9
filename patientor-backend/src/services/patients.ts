//import patientData from '../../data/patients.json';
import patients from '../../data/patientsTyped';
import { Patient, NonSensitivePatient, NewPatient, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

//changed data to .ts from .json
//const patients: Array<NonSensitivePatient> = patientData as Array<NonSensitivePatient>;

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, dateOfBirth, name, gender, occupation }) => ({
            id,
            dateOfBirth,
            name,
            gender,
            occupation,
        })
    );
};

const getPatientById = (id:string):Patient | undefined => {
  return patients.find((p) => p.id === id);
};


const addPatient = (entry: NewPatient): Patient  => {
  const addedPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: []
  };
  patients.push(addedPatient);
  return addedPatient;
};

const addEntryToPatient = (patient: Patient, entry: EntryWithoutId): Patient => {
  const id: string = uuid();

  const newEntry = {
    id,
    ...entry,
  };
  
  patient.entries = patient.entries.concat(newEntry);

  return patient;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntryToPatient
};