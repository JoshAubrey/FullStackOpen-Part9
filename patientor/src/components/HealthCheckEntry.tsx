import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HealthCheckEntry as Entry, Diagnosis } from '../types';
import { useStateValue } from '../state';

interface HealthCheckEntryProps {
  entry: Entry;
} 

const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
  const diagnosisCodes: Array<Diagnosis['code']> | undefined = entry.diagnosisCodes;
  const [{ diagnoses }] = useStateValue();

  const heartColors = ['green', 'yellow', 'orange', 'black'];
  const styles = {
    color: heartColors[entry.healthCheckRating]
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='user md' />
        </Card.Header>
        <Card.Description>
          {entry.description}
        </Card.Description>
        <Icon style={styles} name='heart' />
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

export default HealthCheckEntry;