import { Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing name');
  }
  return text;
};

const parseSSN = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing SSN');
  }
  return text;
};

const parseOccup = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing occupation');
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (text: unknown): text is Gender => {
  return Object.values(Gender).includes(text as Gender);
};

const parseGender = (text: unknown): Gender => {
  if (!isGender(text)) {
    throw new Error('Incorrect or missing gender');
  }
  return text; 
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient  => {
    const patient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccup(object.occupation)
    };
    return patient;
  };
  
  export default toNewPatient;