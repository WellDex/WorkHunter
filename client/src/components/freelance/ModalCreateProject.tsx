import {
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from '@mui/material';
import React from 'react';

interface IModalCreateProject {
  open: boolean;
  handleClose: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ModalCreateProject = ({open, handleClose}: IModalCreateProject) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: {value},
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={onSubmit} className="projects-form">
        <h1 className="projects-form-title">Создание проекта</h1>
        <Divider />
        <TextField
          required
          id="outlined-required"
          label="Название проекта"
          placeholder="Введите название проекта..."
        />
        <TextField
          required
          multiline={true}
          id="outlined-required"
          label="Описание проекта"
          placeholder="Введите описание проекта..."
        />
        <TextField
          required
          id="outlined-required"
          label="Бюджет"
          placeholder="Введите бюджет..."
        />
        <FormControl>
          <InputLabel id="demo-multiple-chip-label">Метки</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}>
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider />
        <div className="projects-form-btns">
          <Button variant="contained" onClick={handleClose}>
            отменить
          </Button>
          <Button type="submit" variant="contained">
            создать
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalCreateProject;
