import React from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import Visiblity from "@material-ui/icons/Visibility";
import VisiblityOff from "@material-ui/icons/VisibilityOff";
const Input = ({
  name,
  label,
  handleChange,
  autoFocus,
  type,
  half,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visiblity /> : <VisiblityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
