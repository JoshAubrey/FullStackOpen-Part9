import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HospitalEntry as Entry, Diagnosis } from '../types';
import { useStateValue } from '../state';

interface HospitalEntryProps {
  entry: Entry
}

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
  const diagnosisCodes: Array<Diagnosis['code']> | undefined = entry.diagnosisCodes;
  const [{ diagnoses }] = useStateValue();

  return (
    <Card>
      <Card.Content>

        <Card.Header>
          {entry.date}
          <Icon name='hospital outline' />
        </Card.Header>

        <Card.Description>
          <p>{entry.description}</p>

          <h4>Discharge</h4>
          date: {entry.discharge.date} <br/>
          criteria: {entry.discharge.criteria}

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

export default HospitalEntry;