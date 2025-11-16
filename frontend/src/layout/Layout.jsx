import {Box, Container} from '@mui/material';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({children}) {
    return (
        <Box sx={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
            <Navbar />

            <Container sx={{flex: 1, py: 3}}>
                {children}
            </Container>

            <Footer />
        </Box>
    )
}