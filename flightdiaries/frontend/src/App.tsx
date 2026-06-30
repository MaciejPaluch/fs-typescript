import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import type { DiaryEntry } from "./types";

import diaryService from "./services/diaries.ts";
import DiaryListPage from "./components/DiaryListPage/index.tsx";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {  
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaryList();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Diaries
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route path="/" element={<DiaryListPage diaries={diaries} setDiaries={setDiaries} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
