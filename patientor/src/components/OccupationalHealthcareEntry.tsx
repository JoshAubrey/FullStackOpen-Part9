import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry as Entry, Diagnosis } from '../types';
import { useStateValue } from '../state';

interface OccupationalHealthcareEntryProps {
  entry: Entry
}

const OccupationalHealthcareEntry = ({ entry }: OccupationalHealthcareEntryProps) => {
  const diagnosisCodes: Array<Diagnosis['code']> | undefined = entry.diagnosisCodes;
  const [{ diagnoses }] = useStateValue();

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='stethoscope' />
          {entry.employerName}
        </Card.Header>
        <Card.Description>
          {entry.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <h5>Diagnosis Codes</h5>
        <ul>
          {diagnosisCodes?.map((code:  Diagnosis['code']) =>
            <li key={entry.id + code}>
              {code} {diagnoses.find(diagnose => diagnose.code === code)?.name}
            </li>
          )}
        </ul>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareEntry;