import { Paper, Select, styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#FFFFFF",
    borderRadius: theme.spacing(1.5),
    "& fieldset": {
      borderColor: "#E5E7EB",
    },
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D1D5DB",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 16px",
    "&::placeholder": {
      color: "#9CA3AF",
      opacity: 1,
    },
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  borderRadius: theme.spacing(1.5),
  minWidth: 120,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E5E7EB",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D1D5DB",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D1D5DB",
  },
  "& .MuiSelect-select": {
    padding: "12px 16px",
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  maxWidth: 720,
  margin: "0 auto",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.05)",
}));
