import { OfferCommonProps } from "@/types/onboarding-types";
import { Box, FormControl, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";

export const ExpiryDatePicker: React.FC<OfferCommonProps> = ({
  control,
  label,
  errors,
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" mt={2} mb={1}>
        {label}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name="expired"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <DatePicker
                value={field.value}
                onChange={(date) => field.onChange(date)}
                slotProps={{
                  textField: {
                    size: "medium",
                    fullWidth: true,
                    placeholder: "Date",
                    variant: "outlined",
                    error: !!errors.expired,
                    helperText: errors.expired?.message?.toString(),
                  },
                }}
              />
            </FormControl>
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};
