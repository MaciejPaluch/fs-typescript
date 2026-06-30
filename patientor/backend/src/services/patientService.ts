import patients from '../data/patients.ts' with { type: "json" };
import type { PatientEntry,NonSensitivePatientEntry,NewPatientEntry} from '../types.ts';
import { v1 as uuid } from 'uuid'

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({id,name,dateOfBirth,gender,occupation,entries })=>({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: []
  };
  patients.push(newPatientEntry);
  return newPatientEntry;

};

const findById = (id: string): PatientEntry | undefined => {  
  const entry = patients.find(d => d.id === id);  
  return entry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById
};