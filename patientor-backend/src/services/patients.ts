//import patientData from '../../data/patients.json';
import patients from '../../data/patientsTyped';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

//changed data to .ts from .json
//const patients: Array<NonSensitivePatient> = patientData as Array<NonSensitivePatient>;

const getEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, dateOfBirth, name, gender, occupation }) => ({
            id,
            dateOfBirth,
            name,
            gender,
            occupation,
        })
    );
};

const getEntryById = (id:string):Patient | undefined => {
  return patients.find((p) => p.id === id);
};


const addEntry = (entry: NewPatient): Patient  => {
  const addedPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: []
  };
  patients.push(addedPatient);
  return addedPatient;
};

export default {
  getEntries,
  getEntryById,
  addEntry
};