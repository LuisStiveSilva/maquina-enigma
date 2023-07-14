import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import Rotor from "./components/Rotor/Rotor";
import { styled } from "@mui/material/styles";
import textFieldStyle from "./utils/textFieldStyle";
import selectStyle from "./utils/selectStyle";
import Modal from "./components/Modal/Modal";

const CustomTextField = styled(TextField)(textFieldStyle);
const CustomSelect = styled(Select)(selectStyle);

export default function App() {
  const [abc, setAbc] = useState({
    inOut: "abcdefghijklmnopqrstuvwxyz",
    rotor1: {
      origin: "abcdefghijklmnopqrstuvwxyz",
      destiny: "zyxwvutsrqponmlkjihgfedcba",
    },
    rotor2: {
      origin: "abcdefghijklmnopqrstuvwxyz",
      destiny: "zyxwvutsrqponmlkjihgfedcba",
    },
    rotor3: {
      origin: "abcdefghijklmnopqrstuvwxyz",
      destiny: "zyxwvutsrqponmlkjihgfedcba",
    },
    reflector: "abcdefghijklmnopqrstuvwxyz",
  });

  const [encryptConfig, setEncryptConfig] = useState([
    {
      abc: "rotor1Origin",
      move: "down",
      space: 3,
      letters: ["e"],
    },
    {
      abc: "rotor1Destiny",
      move: "up",
      space: 2,
      letters: ["e"],
    },
    {
      abc: "rotor1Origin",
      move: "horse",
      letters: ["p"],
    },
  ]);

  const handleSelect = (value, index, type) => {
    const tmpArr = [...encryptConfig];
    if (type === "abc") tmpArr[index].abc = value;
    else if (type === "move") {
      tmpArr[index].move = value;
      if (value === "horse") tmpArr[index].space = "";
    } else if (type === "space") tmpArr[index].space = value;
    else if (type === "letters") tmpArr[index].letters = value;
    setEncryptConfig(tmpArr);
  };

  const addConfig = () => {
    const tmpArr = [...encryptConfig];
    tmpArr.push({
      abc: "",
      move: "",
      space: "",
      letters: [],
    });
    setEncryptConfig(tmpArr);
  };

  const deleteConfig = (index) => {
    const tmpArr = [...encryptConfig];
    tmpArr.splice(index, 1);
    setEncryptConfig(tmpArr);
  };

  const [open, setOpen] = useState(false);

  const validateAbc = () => {
    setOpen(true);
  };

  return (
    <Container>
      <Typography align="center" variant="h3" my={2} style={{ color: "black" }}>
        Máquina enigma - Francesca Mendoza
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextField
            label="IN/OUT"
            value={abc.inOut}
            onChange={(e) => setAbc({ ...abc, inOut: e.target.value })}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Rotor
        title="Rotor I"
        origin={abc.rotor1.origin}
        destiny={abc.rotor1.destiny}
        setOrigin={(e) =>
          setAbc({ ...abc, rotor1: { ...abc.rotor1, origin: e.target.value } })
        }
        setDestiny={(e) =>
          setAbc({ ...abc, rotor1: { ...abc.rotor1, destiny: e.target.value } })
        }
        error={{
          origin: abc.rotor1.origin.length !== abc.inOut.length,
          destiny: abc.rotor1.destiny.length !== abc.inOut.length,
        }}
        helperText={{
          origin: `El abecedario debe tener la misma cantidad que el abecedario del IN/OUT (${abc.inOut.length > abc.rotor1.origin.length
            ? "faltan " +
            (abc.inOut.length - abc.rotor1.origin.length) +
            " caracteres"
            : "sobran " +
            (abc.rotor1.origin.length - abc.inOut.length) +
            " caracteres"
            })`,
          destiny: `El abecedario debe tener la misma cantidad que el abecedario del IN/OUT (${abc.inOut.length > abc.rotor1.destiny.length
            ? "faltan " +
            (abc.inOut.length - abc.rotor1.destiny.length) +
            " caracteres"
            : "sobran " +
            (abc.rotor1.destiny.length - abc.inOut.length) +
            " caracteres"
            })`,
        }}
      />
      <Rotor
        title="Rotor II"
        origin={abc.rotor2.origin}
        destiny={abc.rotor2.destiny}
        setOrigin={(e) =>
          setAbc({ ...abc, rotor2: { ...abc.rotor2, origin: e.target.value } })
        }
        setDestiny={(e) =>
          setAbc({ ...abc, rotor2: { ...abc.rotor2, destiny: e.target.value } })
        }
        error={{
          origin: abc.rotor2.origin.length !== abc.inOut.length,
          destiny: abc.rotor2.destiny.length !== abc.inOut.length,
        }}
        helperText={{
          origin: `El abecedario debe tener la misma cantidad que el abecedario del IN/OUT (${abc.inOut.length > abc.rotor2.origin.length
            ? "faltan " +
            (abc.inOut.length - abc.rotor2.origin.length) +
            " caracteres"
            : "sobran " +
            (abc.rotor2.origin.length - abc.inOut.length) +
            " caracteres"
            })`,
          destiny: `El abecedario debe tener la misma cantidad que el abecedario del IN/OUT (${abc.inOut.length > abc.rotor2.destiny.length
            ? "faltan " +
            (abc.inOut.length - abc.rotor2.destiny.length) +
            " caracteres"
            : "sobran " +
            (abc.rotor2.destiny.length - abc.inOut.length) +
            " caracteres"
            })`,
        }}
      />
      <Rotor
        title="Rotor III"
        origin={abc.rotor3.origin}
        destiny={abc.rotor3.destiny}
        setOrigin={(e) =>
          setAbc({ ...abc, rotor3: { ...abc.rotor3, origin: e.target.value } })
        }
        setDestiny={(e) =>
          setAbc({ ...abc, rotor3: { ...abc.rotor3, destiny: e.target.value } })
        }
        error={{
          origin: abc.rotor3.origin.length !== abc.inOut.length,
          destiny: abc.rotor3.destiny.length !== abc.inOut.length,
        }}
        helperText={{
          origin: `El abecedario debe tener la misma cantidad que el abecedario del IN/OUT (${abc.inOut.length > abc.rotor3.origin.length
            ? "faltan " +
            (abc.inOut.length - abc.rotor3.origin.length) +
            " caracteres"
            : "sobran " +
            (abc.rotor3.origin.length - abc.inOut.length) +
            " caracteres"
            })`,
          destiny: `El abecedario debe tener la misma cantidad que el abecedario del IN/OUT (${abc.inOut.length > abc.rotor3.destiny.length
            ? "faltan " +
            (abc.inOut.length - abc.rotor3.destiny.length) +
            " caracteres"
            : "sobran " +
            (abc.rotor3.destiny.length - abc.inOut.length) +
            " caracteres"
            })`,
        }}
      />
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <CustomTextField
            label="Reflector"
            value={abc.reflector}
            onChange={(e) => setAbc({ ...abc, reflector: e.target.value })}
            error={abc.reflector.length !== abc.inOut.length}
            helperText={
              abc.reflector.length !== abc.inOut.length &&
              `El abecedario debe tener la misma cantidad que el abecedario del IN/OUT (${abc.inOut.length > abc.reflector.length
                ? "faltan " +
                (abc.inOut.length - abc.reflector.length) +
                " caracteres"
                : "sobran " +
                (abc.reflector.length - abc.inOut.length) +
                " caracteres"
              })`
            }
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ background: "rgb(231, 235, 240)" }} />
        </Grid>

        <Grid item xs={12}>
          <Typography align="left" variant="h5" style={{ color: "black" }}>
            Configuración
          </Typography>
        </Grid>
        {encryptConfig.map((config, index) => (
          <Grid item container spacing={2} key={index}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color: "white",
                    background: "#001e3c",
                    padding: "0px 5px",
                    marginTop: "-5px",
                  }}
                >
                  Abecedario
                </InputLabel>
                <CustomSelect
                  labelId="demo-simple-select-label"
                  label="Abecedario"
                  value={config.abc}
                  onChange={(e) => handleSelect(e.target.value, index, "abc")}
                >
                  <MenuItem value="rotor1Origin">Rotor 1 (origen)</MenuItem>
                  <MenuItem value="rotor1Destiny">Rotor 1 (destino)</MenuItem>
                  <MenuItem value="rotor2Origin">Rotor 2 (origen)</MenuItem>
                  <MenuItem value="rotor2Destiny">Rotor 2 (destino)</MenuItem>
                  <MenuItem value="rotor3Origin">Rotor 3 (origen)</MenuItem>
                  <MenuItem value="rotor3Destiny">Rotor 3 (destino)</MenuItem>
                  <MenuItem value="reflector">Reflector</MenuItem>
                </CustomSelect>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color: "white",
                    background: "#001e3c",
                    padding: "0px 5px",
                    marginTop: "-5px",
                  }}
                >
                  Movimiento
                </InputLabel>
                <CustomSelect
                  labelId="demo-simple-select-label"
                  label="Movimiento"
                  value={config.move}
                  onChange={(e) => handleSelect(e.target.value, index, "move")}
                >
                  <MenuItem value="up">Arriba</MenuItem>
                  <MenuItem value="down">Abajo</MenuItem>
                  {(encryptConfig[index].abc === "rotor1Origin" ||
                    encryptConfig[index].abc === "rotor2Origin" ||
                    encryptConfig[index].abc === "rotor3Origin") && (
                      <MenuItem value="horse">Caballo</MenuItem>
                    )}
                </CustomSelect>
              </FormControl>
            </Grid>
            {encryptConfig[index].move !== "horse" && (
              <Grid item xs={3}>
                <CustomTextField
                  label="Espacios"
                  value={config.space}
                  onChange={(e) => handleSelect(e.target.value, index, "space")}
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="number"
                />
              </Grid>
            )}
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color: "white",
                    background: "#001e3c",
                    padding: "0px 5px",
                    marginTop: "-5px",
                  }}
                >
                  Letras
                </InputLabel>
                <CustomSelect
                  labelId="demo-simple-select-label"
                  multiple
                  value={config.letters}
                  onChange={(e) =>
                    handleSelect(e.target.value, index, "letters")
                  }
                >
                  {abc.inOut.split("").map((letter, index2) => (
                    <MenuItem key={"a" + index2} value={letter}>
                      {letter}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteConfig(index)}
              >
                x
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12} align="left">
          <Button
            variant="outlined"
            sx={{
              color: "#e7ebf0",
              borderColor: "#006d77",
              "&:hover": {
                borderColor: "#e7ebf0",
              },
            }}
            onClick={() => addConfig()}
          >
            Agregar
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            sx={{
              color: "#e7ebf0",
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "rgb(0, 109, 119, 0.8)",
              },
              marginBottom: '30px'
            }}
            onClick={() => validateAbc()}
          >
            Continuar
          </Button>
        </Grid>
        <Modal open={open} setOpen={setOpen} abc={abc} config={encryptConfig} />
      </Grid>
    </Container>
  );
}
