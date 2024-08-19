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
    <>
      {showHeader && (
        <div className={style.header}>
          <FilterAlt /> Filtry
        </div>
      )}
      <div className={`${style.container} ${style.margin}`}>
        <TextField
          variant="outlined"
          fullWidth={true}
          name="title"
          label="Nazwa"
          sx={{
            backgroundColor: "white",
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
    </>
  );
}
