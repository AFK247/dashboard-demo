"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledPaper } from "@/styles";
import { createOffer } from "@/api/offers/offerApi";
import { AdditionSelection } from "@/components/onboarding/AdditionSelection";
import { PlanTypeSelection } from "@/components/onboarding/PlanTypeSelection";
import { PriceInput } from "@/components/onboarding/PriceInput";
import { ExpiryDatePicker } from "@/components/onboarding/ExpiryDatePicker";
import { OfferFormData } from "@/types/onboarding-types";
import { offerSchema } from "@/schemas/offerSchema";
import { UserAutocomplete } from "@/components/onboarding/UserAutocomplete";

const CreateOfferForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      plan_type: "monthly",
      additions: [],
      user_id: "",
      expired: null,
      price: 0,
    },
  });

  // Submit handler
  const onSubmit = async (data: OfferFormData) => {
    const transformedData = {
      ...data,
      user_id: parseInt(data.user_id),
      expired: data.expired?.format("YYYY-MM-DD"),
    };

    await createOffer(transformedData);
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

        <Box sx={{ borderBottom: 1, borderColor: "divider", my: 2 }} />

        <PlanTypeSelection control={control} label="Plan Type" />

        <AdditionSelection control={control} label="Additions" />

        <UserAutocomplete
          control={control}
          label="User"
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          clearErrors={clearErrors}
        />

        <ExpiryDatePicker control={control} label="Expired" errors={errors} />

        <PriceInput control={control} label="Price" errors={errors} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 5, display: "block", ml: "auto", backgroundColor: "black" }}
        >
          Send Offer
        </Button>
      </form>
    </StyledPaper>
  );
};

export default CreateOfferForm;
