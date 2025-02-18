import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: "0px 3px 5px rgba(0,0,0,0.05)",
}));
