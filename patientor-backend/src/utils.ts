import { 
  Gender, NewPatient, //Entry,
  Diagnose, Discharge, SickLeave, 
  HealthCheckRating, NewEntry 
} from './types';

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

// const parseEntries = (entries: unknown[]): Entry[] => {
//   if (
//     !entries || !isArray(entries) || !entries.some((entry: unknown) => isEntry(entry))
//   ) {
//     throw new Error('Invalid or missing entries');
//   }
//   return entries as Entry[];
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient  => {
    const patient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccup(object.occupation)
      //entries: parseEntries(entries)
    };
  return patient;
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discrimated union member: ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is NewEntry => {
  return ['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): boolean => {
  return isEntryType(param.type);
};

const parseEntry = (entry: unknown): NewEntry => {
  if (!entry || !isEntry(entry)) {
    throw new Error('Invalid or missing entry');
  }
  return entry as NewEntry;
};

const parseDescription = (desc: unknown): string => {
  if (!desc || !isString(desc)) {
    throw new Error('Invalid or missing description');
  }
  return desc;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Invalid or missing specialist');
  }
  return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = (param: any): boolean => {
  return param.constructor === Array;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
  if (
    !discharge || !discharge.date || !discharge.criteria ||
    !isDate(discharge.date) || !isString(discharge.criteria)
  ) {
    throw new Error(`Invalid or missing discharge date or criteria: ${discharge}`);
  }

  return discharge as Discharge;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown[] | undefined): Array<Diagnose['code']> => {
  if (
    !diagnosisCodes || !isArray(diagnosisCodes) || !diagnosisCodes.every((code: unknown) => isString(code))
  ) {
    throw new Error('Invalid or missing diagnosisCodes');
  }
  return diagnosisCodes as Array<Diagnose['code']>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};


const parseHeathlCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Invalid or missing rating ' + rating);
  }
  return rating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Invalid or missing employer name');
  }
  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) return;

  if (
    !sickLeave.startDate || !sickLeave.endDate ||
    !isString(sickLeave.startDate) || !isString(sickLeave.endDate)
  ) {
    throw new Error(`Invalid or missing sickLeave startDate or endDate: ${sickLeave}`);
  }

  return sickLeave as SickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntryOnPatient = (newEntry: any): NewEntry => {
  // Check if newEntry has a valid type
  const validEntryType = parseEntry(newEntry);
  if (!validEntryType) throw new Error("Entry not valid");

  const entry: Omit<NewEntry, 'id' | 'type'> = {
    description: parseDescription(validEntryType.description),
    date: parseDate(validEntryType.date),
    specialist: parseSpecialist(validEntryType.specialist),
    diagnosisCodes: parseDiagnosisCodes(validEntryType.diagnosisCodes)
  };

  switch (validEntryType.type) {
    case 'Hospital':
      return {
        ...entry,
        type: validEntryType.type,
        discharge: parseDischarge(validEntryType.discharge)
      };
    case 'HealthCheck':
      return {
        ...entry,
        type: validEntryType.type,
        healthCheckRating: parseHeathlCheckRating(validEntryType.healthCheckRating)
      };
    case 'OccupationalHealthcare':
      return {
        ...entry,
        type: validEntryType.type,
        employerName: parseEmployerName(validEntryType.employerName),
        sickLeave: parseSickLeave(validEntryType.sickLeave)
      };
    default:
      return assertNever(validEntryType);
  }
};