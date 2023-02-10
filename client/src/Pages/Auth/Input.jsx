import { Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import React from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function Input({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
}) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12} color="black">
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <MdVisibility />
                      ) : (
                        <MdVisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
}

export default Input;
