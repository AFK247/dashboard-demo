import { ListItem, Paper, Select, styled, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

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
    padding: "12px 0px",
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

// Styled components
export const StyledListItem = styled(ListItem)({
  padding: "8px 24px",
  marginBottom: "4px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  width: "100%",
});

export const StyledImage = styled(Image)({
  width: "20px",
  height: "20px",
  marginRight: "12px",
  opacity: 0.6,
});
