import { OfferCommonProps } from "@/types/onboarding.types";
import { Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const PriceInput: React.FC<OfferCommonProps> = ({
  control,
  label,
  errors,
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" mt={2} mb={1}>
        {label}
      </Typography>
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            variant="outlined"
            size="medium"
            fullWidth
            placeholder="Price"
            error={!!errors.price}
            helperText={errors.price?.message}
            InputProps={{
              startAdornment: <AttachMoneyIcon color="action" />,
            }}
            value={field.value === 0 ? "" : field.value}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              field.onChange(isNaN(value) ? 0 : value);
            }}
          />
        )}
      />
    </Box>
  );
};
