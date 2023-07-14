import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import textFieldStyle from "../../utils/textFieldStyle";

const CustomTextField = styled(TextField)(textFieldStyle);

export default function Modal({ open, setOpen, abc, config }) {
  const [rawText, setRawText] = useState("");
  const [result, setResult] = useState("");

  const getOriginIndex = (letter, origin, destinyLetter, abcOrigin) => {
    console.log(letter, origin, destinyLetter)
    let index = 0;
    config.forEach((e) => {
      if (
        e.move === "horse" &&
        e.letters.includes(letter) &&
        e.abc === abcOrigin
      ) {
        index = origin.findIndex((el) => el === destinyLetter);
        index -= 2;
        if (index < 0) {
          index = abc.inOut.length - index;
        }
      } else {
        index = origin.findIndex((el) => el === destinyLetter);
      }
    });
    console.log(index)
    console.log("---------------------------")
    return index;
  };

  const encrypt = () => {
    const encryptMessage = [];
    const rawArray = rawText.split("");

    let inOut = abc.inOut.split("");
    let rotor1Origin = abc.rotor1.origin.split("");
    let rotor2Origin = abc.rotor2.origin.split("");
    let rotor3Origin = abc.rotor3.origin.split("");
    let rotor1Destiny = abc.rotor1.destiny.split("");
    let rotor2Destiny = abc.rotor2.destiny.split("");
    let rotor3Destiny = abc.rotor3.destiny.split("");
    let reflector = abc.reflector.split("");

    rawArray.forEach((letter) => {
      if (letter === " ") {
        encryptMessage.push(letter);
      } else {
        // IDA INOUT
        const inOutIndexGoing = inOut.findIndex((e) => e === letter);
        // IDA ROTOR 1
        const rotor1DestinyLetterGoing = rotor1Destiny[inOutIndexGoing];
        let rotor1OriginIndexGoing = getOriginIndex(
          letter,
          rotor1Origin,
          rotor1DestinyLetterGoing,
          "rotor1Origin"
        );

        // IDA ROTOR 2
        const rotor2DestinyLetterGoing = rotor2Destiny[rotor1OriginIndexGoing];
        const rotor2OriginIndexGoing = getOriginIndex(
          letter,
          rotor2Origin,
          rotor2DestinyLetterGoing,
          "rotor2Origin"
        );

        // IDA ROTOR 3
        const rotor3DestinyLetterGoing = rotor3Destiny[rotor2OriginIndexGoing];
        const rotor3OriginIndexGoing = getOriginIndex(
          letter,
          rotor3Origin,
          rotor3DestinyLetterGoing,
          "rotor3Origin"
        );

        // IDA REFLECTOR
        const reflectorGoing = reflector[rotor3OriginIndexGoing];
        let reflectorIndexReturn = "";
        const reflectorIndexes = reflector
          .map((letter, i) => (letter === reflectorGoing ? i : -1))
          .filter((index) => index !== -1);

        if (reflectorIndexes.length === 2) {
          const onlyOneIndex = reflectorIndexes.filter(
            (e) => e !== rotor3OriginIndexGoing
          );
          reflectorIndexReturn = Number(onlyOneIndex.join());
        } else {
          reflectorIndexReturn = rotor3OriginIndexGoing;
        }

        // VUELTA ROTOR 3
        const rotor3OriginLetterReturn = rotor3Origin[reflectorIndexReturn];
        const rotor3DestinyIndexReturn = rotor3Destiny.findIndex(
          (e) => e === rotor3OriginLetterReturn
        );

        // VUELTA ROTOR 2
        const rotor2OriginLetterReturn = rotor2Origin[rotor3DestinyIndexReturn];
        const rotor2DestinyIndexReturn = rotor2Destiny.findIndex(
          (e) => e === rotor2OriginLetterReturn
        );

        // VUELTA ROTOR 1
        const rotor1OriginLetterReturn = rotor1Origin[rotor2DestinyIndexReturn];
        const rotor1DestinyIndexReturn = rotor1Destiny.findIndex(
          (e) => e === rotor1OriginLetterReturn
        );

        // VUELTA INOUT
        const inOutReturn = inOut[rotor1DestinyIndexReturn];

        encryptMessage.push(inOutReturn);

        config.forEach((e) => {
          if (e.letters.includes(letter)) {
            switch (e.abc) {
              case "rotor1Origin":
                if (e.move === "up") {
                  for (let i = 0; i < e.space; i++) {
                    rotor1Origin.unshift(
                      rotor1Origin[rotor1Origin.length - (i + 1)]
                    );
                  }
                  rotor1Origin.splice(
                    rotor1Origin.length - (e.space + 1),
                    e.space
                  );
                } else {
                  for (let i = 0; i < e.space; i++) {
                    rotor1Origin.push(rotor1Origin[i]);
                  }
                  rotor1Origin.splice(0, e.space);
                }
                break;
              case "rotor2Origin":
                if (e.move === "up") {
                  for (let i = 0; i < e.space; i++) {
                    rotor2Origin.unshift(
                      rotor2Origin[rotor2Origin.length - (i + 1)]
                    );
                  }
                  rotor2Origin.splice(
                    rotor2Origin.length - (e.space + 1),
                    e.space
                  );
                } else {
                  for (let i = 0; i < e.space; i++) {
                    rotor2Origin.push(rotor2Origin[i]);
                  }
                  rotor2Origin.splice(0, e.space);
                }
                break;
              case "rotor3Origin":
                if (e.move === "up") {
                  for (let i = 0; i < e.space; i++) {
                    rotor3Origin.unshift(
                      rotor3Origin[rotor3Origin.length - (i + 1)]
                    );
                  }
                  rotor3Origin.splice(
                    rotor3Origin.length - (e.space + 1),
                    e.space
                  );
                } else {
                  for (let i = 0; i < e.space; i++) {
                    rotor3Origin.push(rotor3Origin[i]);
                  }
                  rotor3Origin.splice(0, e.space);
                }
                break;
              case "rotor1Destiny":
                if (e.move === "up") {
                  for (let i = 0; i < e.space; i++) {
                    rotor1Destiny.unshift(
                      rotor1Destiny[rotor1Destiny.length - (i + 1)]
                    );
                  }
                  rotor1Destiny.splice(
                    rotor1Destiny.length - (e.space + 1),
                    e.space
                  );
                } else {
                  for (let i = 0; i < e.space; i++) {
                    rotor1Destiny.push(rotor1Destiny[i]);
                  }
                  rotor1Destiny.splice(0, e.space);
                }
                break;
              case "rotor2Destiny":
                if (e.move === "up") {
                  for (let i = 0; i < e.space; i++) {
                    rotor2Destiny.unshift(
                      rotor2Destiny[rotor2Destiny.length - (i + 1)]
                    );
                  }
                  rotor2Destiny.splice(
                    rotor2Destiny.length - (e.space + 1),
                    e.space
                  );
                } else {
                  for (let i = 0; i < e.space; i++) {
                    rotor2Destiny.push(rotor2Destiny[i]);
                  }
                  rotor2Destiny.splice(0, e.space);
                }
                break;
              case "rotor3Destiny":
                if (e.move === "up") {
                  for (let i = 0; i < e.space; i++) {
                    rotor3Destiny.unshift(
                      rotor3Destiny[rotor3Destiny.length - (i + 1)]
                    );
                  }
                  rotor3Destiny.splice(
                    rotor3Destiny.length - (e.space + 1),
                    e.space
                  );
                } else {
                  for (let i = 0; i < e.space; i++) {
                    rotor3Destiny.push(rotor3Destiny[i]);
                  }
                  rotor3Destiny.splice(0, e.space);
                }
                break;
              case "reflector":
                if (e.move === "up") {
                  for (let i = 0; i < e.space; i++) {
                    reflector.unshift(reflector[reflector.length - (i + 1)]);
                  }
                  reflector.splice(reflector.length - (e.space + 1), e.space);
                } else {
                  for (let i = 0; i < e.space; i++) {
                    reflector.push(reflector[i]);
                  }
                  reflector.splice(0, e.space);
                }
                break;
              default:
                break;
            }
          }
        });
      }
    });
    console.log(rotor1Origin);
    setResult(encryptMessage.join(""));
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle sx={{ backgroundColor: "#a2d2ff", color: "black" }}>
        Encriptamiento
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#a2d2ff" }} pt={2}>
        <CustomTextField
          label="Texto a cifrar"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          helperText=""
          variant="outlined"
          fullWidth
          sx={{ marginTop: "10px" }}
        />
        <Button
          variant="contained"
          sx={{
            color: "#e7ebf0",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "rgb(0, 109, 119, 0.8)",
            },
            marginTop: "15px",
          }}
          onClick={() => encrypt()}
        >
          Continuar
        </Button>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
            color: "black",
          }}
        >
          <h4>{result}</h4>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
