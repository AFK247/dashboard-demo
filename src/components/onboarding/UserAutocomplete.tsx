import { getAllUser } from "@/api/users/usersApi";
import { UserAutocompleteProps, UserOption } from "@/types/onboarding-types";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const UserAutocomplete: React.FC<UserAutocompleteProps> = ({
  control,
  label,
  errors,
  setValue,
  getValues,
  clearErrors,
}) => {
  // State for Autocomplete users
  const [users, setUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounced function to fetch users
  const fetchUsers = debounce(async (query: string) => {
    if (query.trim().length > 0) {
      setLoading(true);

      const data = await getAllUser();
      const allNames = data?.data.map((user: { name: string; id: number }) => ({
        label: user.name,
        value: user.id.toString(),
      }));

      const userVal = allNames.length
        ? allNames
        : [{ label: "No Result Found", value: "" }];

      setUsers(userVal);
      setLoading(false);
    } else {
      setUsers([]);
    }
  }, 400);

  // Handle Autocomplete change
  const handleUserChange = (
    event: any,
    newValue: { label: string; value: string } | null
  ) => {
    if (newValue) {
      setValue("user_id", newValue.value);
      clearErrors("user_id");
    } else {
      setValue("user_id", "");
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2" mt={2} mb={1}>
        {label}
      </Typography>
      <Controller
        name="user_id"
        control={control}
        render={({ field }) => (
          <Autocomplete
            options={users}
            loading={loading}
            getOptionLabel={(option) => option.label}
            value={
              users.find((user) => user.value === getValues("user_id")) || null
            } // set value prop here
            onChange={handleUserChange}
            onInputChange={(_, value) => {
              fetchUsers(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="medium"
                placeholder="Type to select user"
                error={!!errors.user_id}
                helperText={errors.user_id?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: params.InputProps.endAdornment,
                }}
              />
            )}
          />
        )}
      />
    </Box>
  );
};
