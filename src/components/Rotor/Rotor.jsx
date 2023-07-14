import React from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import textFieldStyle from "../../utils/textFieldStyle";

const CustomTextField = styled(TextField)(textFieldStyle);

export default function Rotor({
  title,
  origin,
  destiny,
  setOrigin,
  setDestiny,
  error,
  helperText,
}) {
  return (
    <Grid item container spacing={2} mt={2}>
      <Grid item xs={12}>
        <Typography align="left" variant="h5" style={{ color: "black" }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          label="Origen"
          value={origin}
          onChange={setOrigin}
          error={error.origin}
          helperText={error.origin && helperText.origin}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextField
          label="Destino"
          value={destiny}
          onChange={setDestiny}
          error={error.destiny}
          helperText={error.destiny && helperText.destiny}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ background: "rgb(231, 235, 240)" }} />
      </Grid>
    </Grid>
  );
}
