import { Entry, Diagnosis } from '../types'; 

interface WrapperProps {
  entry: Entry;
  children?: React.ReactNode;
  diagnoses: Diagnosis[]; 
}

export const BaseEntryWrapper = ({ entry, children, diagnoses }: WrapperProps) => {
  const entryStyle = {
    border: '1px solid #000',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  const findDescription = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  return (
    <div style={entryStyle}>
      <p>{entry.date} <i>{entry.description}</i></p>
      
      {children}
      
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes.map(code => (
            <li key={code}>{code} {findDescription(code)}</li>
          ))}
        </ul>
      )}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};