import type {HospitalEntry,HealthCheckEntry,OccupationalHealthcareEntry,Diagnosis} from '../types'
import {BaseEntryWrapper} from './BaseEntryWrapper'

interface HospitalProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

export const HospitalEntryDetails = ({ entry, diagnoses }: HospitalProps) => {
  return (
    <BaseEntryWrapper entry={entry} diagnoses={diagnoses}>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Discharge criteria: {entry.discharge.criteria}</p>
    </BaseEntryWrapper>
  );
};


interface OccupationalProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

export const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: OccupationalProps) => {
  return (
    <BaseEntryWrapper entry={entry} diagnoses={diagnoses}>
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave && (
        <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
      )}
    </BaseEntryWrapper>
  );
};


interface HealthCheckProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

export const HealthCheckEntryDetails = ({ entry, diagnoses }: HealthCheckProps) => {
  return (
    <BaseEntryWrapper entry={entry} diagnoses={diagnoses}>
      <p>Health check rating: {entry.healthCheckRating}</p>
    </BaseEntryWrapper>
  );
};