import { Button } from "@mui/material";

export default function PrimaryButton({ children, onClick, type = "button", fullWidth = false}) {
    return (
        <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        type={type}
        fullWidth={fullWidth}
        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
        >
            {children}
        </Button>
    );
}