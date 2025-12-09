import { TextField } from "@mui/material";

export default function TextInput( {id, label, value, onChange, type = "text", error, helperText, shrinkLabel }) {
    return (
        <TextField
            id={id}
            label={label}
            value={value}
            onChange={onChange}
            type={type}
            fullWidth
            error={error}
            helperText={helperText}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: shrinkLabel}}
        />
    );
}