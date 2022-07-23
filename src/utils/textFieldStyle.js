const textFieldStyle = {
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& label": {
    color: "#bbb",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#bbb",
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": {
      borderColor: "#bbb",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
};

export default textFieldStyle;
