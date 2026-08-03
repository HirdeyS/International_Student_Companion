import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg,#020617 0%,#0F172A 50%,#111827 100%)",
      }}
    >
      <Navbar />

      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          py: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          {children}
        </motion.div>
      </Container>

      <Footer />
    </Box>
  );
}