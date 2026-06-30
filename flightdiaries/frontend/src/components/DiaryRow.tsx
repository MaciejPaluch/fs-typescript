import { useState } from 'react';
import { TableRow, TableCell, Button, Collapse, Box, Typography } from '@mui/material';
import axios from 'axios';
import type { DiaryEntry } from '../types'; 

interface RowProps {
  diary: DiaryEntry;
}

const DiaryRow = ({ diary }: RowProps) => {
  const [open, setOpen] = useState(false);
  const [fullData, setFullData] = useState<DiaryEntry | null>(null);

  const handleToggle = async () => {

    if (!open && !fullData) {
      try {
        const response = await axios.get<DiaryEntry>(`http://localhost:3001/api/diaries/${diary.id}`);
        setFullData(response.data);
      } catch (e) {
        console.error("Nie udało się pobrać komentarza", e);
      }
    }
    setOpen(!open);
  };

  return (
    <>
      {/* Główny wiersz widoczny cały czas */}
      <TableRow>
        <TableCell>{diary.date}</TableCell>
        <TableCell>{diary.weather}</TableCell>
        <TableCell>{diary.visibility}</TableCell>
        <TableCell>
          <Button variant="outlined" onClick={handleToggle}>
            {open ? 'Zwiń' : 'Rozwiń'}
          </Button>
        </TableCell>
      </TableRow>
      
      {/* Wiersz z rozwijanym komentarzem (Collapse) */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
                Comment:
              </Typography>
              <Typography variant="body1">
                {/* Jeśli pobraliśmy fullData, wyświetl komentarz. Jeśli nie ma komentarza, pokaż info */}
                {fullData ? (fullData.comment || "No comment provided.") : "Loading..."}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DiaryRow