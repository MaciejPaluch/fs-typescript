import { z } from 'zod';
import { NewEntrySchema } from './utils.ts'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DiagnoseEntry {
    code : string,
    name: string,
    latin?: string,
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Discharge {
  date: string,
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: Discharge
}

interface sickLeave {
  startDate: string,
  endDate: string,
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: sickLeave

}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;