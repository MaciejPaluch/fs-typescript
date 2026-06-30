import { Entry, Diagnosis, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';
import { assertNever } from '../utils';
import { BaseEntryWrapper } from './BaseEntryWrapper';
import {HospitalEntryDetails,OccupationalHealthcareEntryDetails,HealthCheckEntryDetails} from'./differentEntries';

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

export const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  switch (entry.type) {
    case "Hospital":
      // Przekazujemy diagnozy dalej w dół!
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};