import React from "react";
import { CardContent, Typography } from "@mui/material";
import { Stat } from "@/types";
import { StyledCard } from "../ui/StyledCard";

interface StatCardProps {
  stat: Stat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary">
          {stat.title}
        </Typography>
        <Typography variant="h5" fontWeight="600" mt={0.5}>
          {stat.value}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {stat.change} previous month
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default StatCard;
