import React from 'react';
import { Entry as EntryType } from '../types';
import EntryDetails from './EntryDetails';

interface EntriesProps {
  entries: EntryType[]
}

const Entries = ({ entries }: EntriesProps) => {

  return (
    <div>
      <h3>entries</h3>
      
      {entries.length === 0 && <p>No entries</p>}
  
      {entries.map(entry => 
        <EntryDetails key={entry.id} entry={entry} />
      )}
    </div>
  );
};

export default Entries;