import type { NewPatientEntry} from './types.ts';
import { Gender } from './types.ts';
import { z } from 'zod';

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()  
});

export const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};
