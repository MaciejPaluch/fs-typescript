import diagnoseData from '../data/diagnoses.ts' with { type: "json" };
import type { DiagnoseEntry } from '../types.ts';

const diagnoses: DiagnoseEntry[] = diagnoseData as DiagnoseEntry[];

const getEntries = (): DiagnoseEntry[]  => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};