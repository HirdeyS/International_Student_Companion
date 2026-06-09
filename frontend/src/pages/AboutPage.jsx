import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    Stack,
  } from "@mui/material";
  
  export default function AboutPage() {
    const features = [
      {
        title: "Student-Friendly Housing",
        description:
          "Helping students explore housing options with filters that make sense, like budget, distance, and student-friendly preferences.",
        emoji: "🏠",
      },
      {
        title: "Smart Reminders",
        description:
          "Keeping students on track with important deadlines like study permits, SIN updates, PGWP preparation, and other key dates.",
        emoji: "⏰",
      },
      {
        title: "Trusted Updates",
        description:
          "Bringing important immigration and student-related updates into one place so students do not have to search everywhere.",
        emoji: "📰",
      },
      {
        title: "Community Q&A Forum",
        description:
          "A space where students can ask questions, share experiences, and help each other navigate life in Canada through a supportive student community.",
        emoji: "💬",
      }
    ];
  
    const team = [
      {
        name: "Hirdey",
        role: "Team Lead & Project Coordination",
        note: "Leading project planning, documentation, and team coordination while helping ensure the project stays organized and on schedule.",
        emoji: "✨",
      },
      {
        name: "Piyush",
        role: "Backend Development & Cloud Integration",
        note: "Developing backend services, cloud-based features, and reminder systems that support the platform's core functionality.",
        emoji: "🚀",
      },
      {
        name: "Faraz",
        role: "Backend Development & Database Management",
        note: "Designing and managing database solutions while contributing to backend development and system functionality.",
        emoji: "🛠️",
      },
      {
        name: "Nicklas",
        role: "Frontend Development",
        note: "Building user-facing features and creating an intuitive, responsive experience across the platform.",
        emoji: "🎨",
      },
    ];
  
    return (
      <Box sx={{ backgroundColor: "#f7f9fc", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
              p: 5,
              borderRadius: 4,
              background:
                "linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #f3e5f5 100%)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              About International Student Companion 🌎
            </Typography>
  
            <Typography
              variant="h6"
              sx={{ color: "text.secondary", maxWidth: "850px", mx: "auto" }}
            >
              A friendly platform built to make life in Canada a little less
              confusing and a lot more organized for international students.
            </Typography>
  
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              flexWrap="wrap"
              sx={{ mt: 3, gap: 1 }}
            >
              <Chip label="Housing Help" color="primary" />
              <Chip label="Smart Reminders" color="secondary" />
              <Chip label="Student Updates" color="success" />
            </Stack>
          </Box>
  
          {/* Mission Section */}
          <Card sx={{ mb: 5, borderRadius: 4, boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Our Mission
              </Typography>
  
              <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                Moving to a new country is exciting, but it can also feel
                overwhelming. International Student Companion is designed to help
                students manage important parts of student life in one place —
                finding housing, remembering important deadlines, and staying
                updated with trusted information.
              </Typography>
  
              <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.8, mt: 2 }}>
                Some of us on the team are international students too, so this
                project is built with real experiences in mind. We wanted to
                create something practical, welcoming, and genuinely useful for
                students starting their journey in Canada.
              </Typography>
            </CardContent>
          </Card>
  
          {/* Features Section */}
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
            What Our Platform Offers
          </Typography>
  
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {features.map((feature) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                      {feature.emoji}
                    </Typography>
  
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                      {feature.title}
                    </Typography>
  
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
  
          {/* Team Section */}
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
            Meet the Team
          </Typography>
  
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {team.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.name}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    textAlign: "center",
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h3" sx={{ mb: 1 }}>
                      {member.emoji}
                    </Typography>
  
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {member.name}
                    </Typography>
  
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "primary.main", fontWeight: "bold", mt: 1 }}
                    >
                      {member.role}
                    </Typography>
  
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 2 }}>
                      {member.note}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
  
          {/* Closing Section */}
          <Box
            sx={{
              textAlign: "center",
              p: 5,
              borderRadius: 4,
              backgroundColor: "white",
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Built for Students, by Student
            </Typography>
  
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", color: "text.secondary", maxWidth: "800px", mx: "auto" }}
            >
              Our goal is simple: make the international student journey feel more
              supported, organized, and less stressful. This project is our way of
              turning real student challenges into a helpful digital solution.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }