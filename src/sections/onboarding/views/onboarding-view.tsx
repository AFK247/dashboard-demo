"use client";
import React from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Select,
  MenuItem,
  styled,
  Paper,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TextField } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  maxWidth: 600,
  margin: "0 auto",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.05)",
}));

// Define validation schema using Zod
const offerSchema = z.object({
  planType: z.enum(["payAsYouGo", "monthly", "yearly"], {
    required_error: "Plan type is required",
  }),
  refundable: z.boolean(),
  onDemand: z.boolean(),
  negotiable: z.boolean(),
  user: z.string().min(1, "User is required"),
  expiryDate: z.instanceof(dayjs as any, {
    message: "Expiry date is required",
  }),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid amount"),
});

type OfferFormData = z.infer<typeof offerSchema>;

interface CreateOfferFormProps {}

const CreateOfferForm: React.FC<CreateOfferFormProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      planType: "monthly",
      refundable: false,
      onDemand: false,
      negotiable: false,
      user: "Jason Momoa",
      expiryDate: null,
      price: "",
    },
  });

  const onSubmit = (data: OfferFormData) => {
    console.log("Form data submitted:", data);
    // Here you would send the data to your API
  };

  return (
    <StyledPaper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" component="h2" gutterBottom>
          Create Offer
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Send onboarding offer to new user
        </Typography>

        <Typography variant="subtitle1" mt={3} mb={1}>
          Plan Type
        </Typography>
        <Controller
          name="planType"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel
                value="payAsYouGo"
                control={<Radio size="small" />}
                label="Pay As You Go"
              />
              <FormControlLabel
                value="monthly"
                control={<Radio size="small" />}
                label="Monthly"
              />
              <FormControlLabel
                value="yearly"
                control={<Radio size="small" />}
                label="Yearly"
              />
            </RadioGroup>
          )}
        />
        {errors.planType && (
          <FormHelperText error>{errors.planType.message}</FormHelperText>
        )}

        <Typography variant="subtitle1" mt={3} mb={1}>
          Additions
        </Typography>
        <Box display="flex" gap={2}>
          <Controller
            name="refundable"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Refundable"
              />
            )}
          />
          <Controller
            name="onDemand"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="On demand"
              />
            )}
          />
          <Controller
            name="negotiable"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Negotiable"
              />
            )}
          />
        </Box>

        <Typography variant="subtitle1" mt={3} mb={1}>
          User
        </Typography>
        <Controller
          name="user"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.user} size="small">
              <InputLabel id="user-label">User</InputLabel>
              <Select
                {...field}
                labelId="user-label"
                variant="outlined"
                label="User"
              >
                <MenuItem value="Jason Momoa">Jason Momoa</MenuItem>
                <MenuItem value="Another User">Another User</MenuItem>
              </Select>
              {errors.user && (
                <FormHelperText>{errors.user.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Typography variant="subtitle1" mt={3} mb={1}>
          Expired
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="expiryDate"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.expiryDate}>
                <DatePicker
                  label="Select Date"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      placeholder: "Date",
                      variant: "outlined",
                      error: !!errors.expiryDate,
                      helperText: errors.expiryDate?.message?.toString(),
                    },
                  }}
                />
              </FormControl>
            )}
          />
        </LocalizationProvider>

        <Typography variant="subtitle1" mt={3} mb={1}>
          Price
        </Typography>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Price"
              error={!!errors.price}
              helperText={errors.price?.message}
              InputProps={{
                startAdornment: <AttachMoneyIcon color="action" />,
              }}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4, display: "block", ml: "auto" }}
        >
          Send Offer
        </Button>
      </form>
    </StyledPaper>
  );
};

export default CreateOfferForm;
