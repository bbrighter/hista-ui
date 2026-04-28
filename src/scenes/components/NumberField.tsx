import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

/**
 * This component is a placeholder for FormControl to correctly set the shrink label state on SSR.
 */
function SSRInitialFilled(_: BaseNumberField.Root.Props) {
  return null;
}
SSRInitialFilled.muiName = "Input";

export default function NumberField({
  id: idProp,
  label,
  error,
  unit,
  size = "medium",
  loading,
  sx,
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  size?: "small" | "medium";
  error?: boolean;
  unit?: string
  sx?: SxProps<Theme>
  loading?: boolean
}) {
  let id = React.useId();
  if (idProp) {
    id = idProp;
  }

  const defaultSx: SxProps<Theme> = {
    "& .MuiFormControl-root": {
      minHeight: size === "small" ? "32px" : "42px",
      height: size === "small" ? "32px" : "42px",
      padding: size == "small" ? "0px" : "6px",
      margin: size === "small" ? "0px": "6px",
    },
    "& .MuiInput-input": {
      py: size === "small" ? "0px" : "6px",
      my: size === "small" ? "0px": "6px",
    },
  };

  const mergedSx = { ...defaultSx, ...sx };

  return (
    <BaseNumberField.Root
      {...other}
      render={(props, state) => (
        <FormControl
          sx={mergedSx}
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          variant="standard"
        >
          {props.children}
        </FormControl>
      )}
    >
      <SSRInitialFilled {...other} />
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <BaseNumberField.Input
        id={id}
        render={(props, state) => (
          <Input
            data-testid="number-input"
            inputRef={props.ref}
            value={state.inputValue}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            slotProps={{
              input: {
                ...props,
                type: "number",
              },
            }}
            endAdornment={
              <Typography 
                color="textSecondary">
                {unit}
              </Typography>
            }
            startAdornment={loading && (            
              <CircularProgress size={20}
                sx={{
                  position: "absolute",
                  margin: "0 8px", // Add horizontal margin for spacing
                  display: "flex",
                  alignSelf: "center", // Center vertically
                }}/>) 
            }
          />
        )}
      />
    </BaseNumberField.Root>
  );
}
