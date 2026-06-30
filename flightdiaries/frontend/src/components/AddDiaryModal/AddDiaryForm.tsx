import { useState,type SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, type SelectChangeEvent } from '@mui/material';

import type { NewDiaryEntry} from "../../types";
import { Weather, Visibility } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewDiaryEntry) => void;
}

interface WeatherOption {
  value: Weather; 
  label: string;
}

interface VisibilityOption {
  value: Visibility; 
  label: string;
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map(v => ({
  value: v, label: v.toString()
}));

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
  value: v, label: v.toString()
}));

const AddDiaryForm = ({ onCancel, onSubmit }: Props) => {
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');


const onWeatherChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const weather = Object.values(Weather).find(w => w.toString() === value);
      if (weather) {
        setWeather(weather); 
      }
    }
  };

  const onVisibilityChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find(w => w.toString() === value);
      if (visibility) {
        setVisibility(visibility); 
      }
    }
  };

    const addDiary = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
        date,
        weather,
        visibility,
        comment
        });
    };

  return (
    <div>
      <form onSubmit={addDiary}>
        <InputLabel sx={{ marginTop: 2.5 }}>Weather</InputLabel>
        <Select
          label="Weather"
          fullWidth
          value={weather}
          onChange={onWeatherChange} 
        >
          {weatherOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          )}
        </Select>
        <InputLabel sx={{ marginTop: 2.5 }}>Weather</InputLabel>
        <Select
          label="Visibilty"
          fullWidth
          value={visibility}
          onChange={onVisibilityChange} 
        >
          {visibilityOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          )}
        </Select>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Comment"
          fullWidth
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />

        <Grid container sx={{ justifyContent: "space-between", marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddDiaryForm;