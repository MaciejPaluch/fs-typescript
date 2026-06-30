import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';
import DiaryRow from "../DiaryRow.tsx"

import type { NewDiaryEntry, DiaryEntry } from "../../types.ts";
import AddDiaryModal from "../AddDiaryModal/index.tsx";

import diaryService from "../../services/diaries.ts";

interface Props {
  diaries : DiaryEntry[]
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const DiaryListPage = ({ diaries, setDiaries } : Props ) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewDiary = async (values: NewDiaryEntry) => {
    try {
      const patient = await diaryService.create(values);
      setDiaries(diaries.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
  if (axios.isAxiosError(e)) {
    const data = e.response?.data;
    
    // Sprawdzamy, czy to błąd Zod (tablica błędów)
    if (data && typeof data === 'object' && 'error' in data) {
      const errorObj = data.error;
      
      // Jeśli to tablica błędów, wyciągamy pierwszy komunikat
      if (Array.isArray(errorObj) && errorObj.length > 0) {
        setError(errorObj[0].message); 
      } else {
        // W innym przypadku zamieniamy na stringa
        setError(JSON.stringify(errorObj));
      }
    } else if (typeof data === 'string') {
      setError(data);
    } else {
      setError("Something went wrong");
    }
  }
}
  };

  return (
        <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table sx={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Weather</TableCell>
            <TableCell>Visibility</TableCell>
            <TableCell>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(diaries).map((diary: DiaryEntry) => (
            <DiaryRow key={diary.id} diary={diary} />
          ))}
        </TableBody>
      </Table>
      <AddDiaryModal
        modalOpen={modalOpen}
        onSubmit={submitNewDiary}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Diary
      </Button>
    </div>
  ); 
};

export default DiaryListPage;
