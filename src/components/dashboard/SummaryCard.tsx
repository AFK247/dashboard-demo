import React from "react";
import { Box, CardContent, Typography } from "@mui/material";
import { StyledCard } from "../ui/StyledCard";
import { NormalizedSummaryData } from "@/types/dashboard.types";
import Image from "next/image";

interface StatCardProps {
  summary: NormalizedSummaryData;
}

const SummaryCard: React.FC<StatCardProps> = ({ summary }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="subtitle2" color="textPrimary">
          {summary?.title}
        </Typography>
        <Typography variant="h4" fontWeight="700" my={0.5}>
          {summary?.value}k
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Image
            src={summary.icon}
            alt={summary?.title}
            width={24}
            height={24}
          />
          <Typography
            variant="subtitle2"
            fontWeight="700"
            color="textSecondary"
          >
            {summary?.change}%
          </Typography>
          <Typography color="textSecondary" variant="body2">
            previous month
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default SummaryCard;
