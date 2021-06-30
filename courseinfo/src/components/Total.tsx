import React from 'react'
import { CoursePart } from '../types';

// interface PartEntry {
//     name: string;
//     exerciseCount: number;
// }

const Total = ({ parts } : {parts: Array<CoursePart>}) => {
    
    const sum = parts.reduce((a, c) => a + c.exerciseCount, 0)
    
    return(
      <p>Number of exercises {sum}</p>
    ) 
}

export default Total