import patientData from '../../data/patients.json';
import { NonSensitivePatient } from '../types';

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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};