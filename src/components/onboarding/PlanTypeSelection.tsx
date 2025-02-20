import { OfferCommonProps } from "@/types/onboarding.types";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

const planTypes = [
  { value: "pay_as_you_go", label: "Pay As You Go" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export const PlanTypeSelection: React.FC<OfferCommonProps> = ({
  control,
  label,
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" mt={2} mb={1}>
        {label}
      </Typography>
      <Controller
        name="plan_type"
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} row>
            {planTypes.map((plan) => (
              <FormControlLabel
                key={plan.value}
                value={plan.value}
                control={
                  <Radio
                    size="small"
                    sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                  />
                }
                label={plan.label}
              />
            ))}
          </RadioGroup>
        )}
      />
    </Box>
  );
};
