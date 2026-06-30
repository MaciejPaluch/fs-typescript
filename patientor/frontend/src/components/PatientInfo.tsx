import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from '../services/patients';
import diagnoseService from '../services/diagnoses';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import type { Patient, Diagnosis, Entry } from "../types";
import { Typography } from '@mui/material';
import {EntryDetails} from '../components/EntryDetails'

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosesList, setDiagnosesList] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const data = await patientService.find(id);
        const diagnoses = await diagnoseService.getAll()
        setPatient(data);
        setDiagnosesList(diagnoses)
      }
    };
    
    void fetchPatient();
  }, [id]); 
    

  if (!patient) {
    return <div>Loading patient data...</div>;
  }
  return (
    <div>
      <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  {patient.name}
  { { 
    male: <MaleIcon />, 
    female: <FemaleIcon />, 
    other: <QuestionMarkIcon/> 
  }[patient.gender] }
</Typography>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <h4>entries</h4>
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnosesList} /> 
      ))}
      
    </div>
  );
};

export default PatientInfo;