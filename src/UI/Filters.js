import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import style from "./Filters.module.css";
import { FilterAlt } from "@mui/icons-material";

export default function Filters(props) {
  const { categories, onInputChangeHandler, values, showHeader } = props;

  function extractDataFromEvent(event) {
    const name = event.target.name;
    const value = event.target.value;
    return { name: name, value: value };
  }

  return (
    <div className={style.filtersPanel}>
      {showHeader && <div className={style.header}>Filtruj realizacje</div>}
      <div className={`${style.container}`}>
        <TextField
          variant="outlined"
          fullWidth={true}
          name="title"
          label="Nazwa"
          sx={{
            backgroundColor: "white",
            ".MuiInputBase-root": {
              borderRadius: "10px",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(0 0 0 / 15%)",
            },
          }}
          onChange={(event) => {
            onInputChangeHandler(extractDataFromEvent(event));
          }}
          value={values.title}
        />
        <FormControl fullWidth>
          <InputLabel id="select-category-label">Kategoria</InputLabel>
          <Select
            labelId="select-category-label"
            defaultValue=""
            label="Kategoria"
            name="category"
            inputProps={{ MenuProps: { disableScrollLock: true } }}
            onChange={(event) => {
              onInputChangeHandler(extractDataFromEvent(event));
            }}
            value={values.category}
            sx={{
              borderRadius: "10px",
              backgroundColor: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(0 0 0 / 15%)",
              },
            }}
          >
            <MenuItem key={0} value="">
              -
            </MenuItem>
            {categories
              ? categories.map((category, index) => {
                  return (
                    <MenuItem key={index + 1} value={category}>
                      {category}
                    </MenuItem>
                  );
                })
              : null}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
