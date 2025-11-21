import { TextField } from "@mui/material";

export default function TextInput( {label, value, onChange, type = "text", error, helperText }) {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            type={type}
            fullWidth
            error={error}
            helperText={helperText}
            sx={{ mb: 2 }}
        />
    );
}