import React from 'react'
import { CoursePart } from '../types';

// interface PartEntry {
//     name: string;
//     exerciseCount: number;
// }

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = ({part} : {part: CoursePart}) => {
    switch (part.type) {
        case 'normal': 
            return (
                <p>
                    <strong>{part.name} {part.exerciseCount}</strong> <br/> 
                    <i>{part.description}</i>
                </p>
            )
        case 'groupProject': 
            return (
                <p>
                    <strong>{part.name} {part.exerciseCount}</strong> <br/> 
                    project exercises {part.groupProjectCount}
                </p>
            )
        case 'submission': 
            return (
                <p>
                    <strong>{part.name} {part.exerciseCount}</strong> <br/> 
                    <i>{part.description}</i> <br/> 
                    submit to {part.exerciseSubmissionLink}
                </p>
            )
        case 'special': 
            return (
                <p>
                    <strong>{part.name} {part.exerciseCount}</strong> <br/> 
                    <i>{part.description}</i> <br/> 
                    required skills {part.requirements.join(', ')}
                </p>
            )
        default: 
            return assertNever(part);
    }
    // return (
    //     <p>
    //     {part.name} {part.exerciseCount}
    //     </p>    
    // )
}
  
const Content = ({ parts } : {parts: Array<CoursePart>}) => {
    return (
        <div>
        {parts.map(part =>
            <Part part={part} key={part.name}/>          
        )}
        </div>
    )
}

export default Content