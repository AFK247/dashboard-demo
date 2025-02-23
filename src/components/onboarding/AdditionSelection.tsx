import { OfferCommonProps } from "@/types/onboarding-types";
import { additionOptions, additionValues } from "@/utils/onboard-utils";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

export const AdditionSelection: React.FC<OfferCommonProps> = ({
  control,
  label,
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" mt={2} mb={1}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {additionOptions.map((option) => (
          <Controller
            key={option.value}
            name="additions"
            control={control}
            render={({ field }) => {
              const isChecked = field.value.includes(
                option.value as (typeof additionValues)[number]
              );
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([...field.value, option.value]);
                        } else {
                          field.onChange(
                            field.value.filter(
                              (v: string) => v !== option.value
                            )
                          );
                        }
                      }}
                      sx={{
                        color: "green",
                        "&.Mui-checked": {
                          color: "green",
                        },
                      }}
                    />
                  }
                  label={option.label}
                />
              );
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
