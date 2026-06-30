import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddDiaryForm from "./AddDiaryForm.tsx";
import type { NewDiaryEntry } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewDiaryEntry) => void;
  error?: string;
}

const AddDiaryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new diary</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddDiaryForm onSubmit={onSubmit} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddDiaryModal;
