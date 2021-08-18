import React from 'react';
import { Entry } from '../types';
import { assertNever } from '../utils';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import HealthCheckEntry from './HealthCheckEntry';

interface EntryProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;