import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  helperText?: React.ReactNode;
};

export function RHFTextField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          error={!!error}
          helperText={helperText ?? error?.message}
          {...other}
          sx={{ "& .MuiInputLabel-root": { top: "inherit", fontSize: "14px" } }}
          size="small"
        />
      )}
    />
  );
}
