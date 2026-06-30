import express from 'express';
import patientService from '../services/patientService.ts';
import { parseNewPatientEntry } from '../utils.ts';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  const data =  patientService.getNonSensitiveEntries()
  res.send(data);
});

router.post('/', (req, res) => {
  try{
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {      
      res.status(400).send({ error: error.issues });    
    } else {      
      res.status(400).send({ error: 'unknown error' });    
    }  
  }
  
});

router.get('/:id', (req, res) => {
  const diary = patientService.findById(String(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

export default router;