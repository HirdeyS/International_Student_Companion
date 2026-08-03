import { Card as MUICard, CardContent } from "@mui/material";

export default function Card({
  children,
  sx,
  ...props
}) {

  return (
    <MUICard
      {...props}
      sx={{
        borderRadius: 3,
        p: 2,
        ...sx,
      }}
    >
      <CardContent>
        {children}
      </CardContent>
    </MUICard>
  );

}