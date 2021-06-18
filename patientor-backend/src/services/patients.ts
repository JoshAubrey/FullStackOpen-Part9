import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<NonSensitivePatient> = patientData as Array<NonSensitivePatient>;

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

const addEntry = (entry: NewPatient): Patient  => {
  const addedPatient: Patient = {
    id: uuid(),
    ...entry
  };
  patients.push(addedPatient);
  return addedPatient;
};

export default {
  getEntries,
  addEntry
};