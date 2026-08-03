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
    },
  ];

  const team = [
    {
      name: "Hirdey",
      role: "Team Lead & Project Coordination",
      note:
        "Leading project planning, documentation, and team coordination while helping ensure the project stays organized and on schedule.",
      emoji: "✨",
    },
    {
      name: "Piyush",
      role: "Backend Development & Cloud Integration",
      note:
        "Developing backend services, cloud-based features, and reminder systems that support the platform's core functionality.",
      emoji: "🚀",
    },
    {
      name: "Faraz",
      role: "Backend Development & Database Management",
      note:
        "Designing and managing database solutions while contributing to backend development and system functionality.",
      emoji: "🛠️",
    },
    {
      name: "Nicklas",
      role: "Frontend Development",
      note:
        "Building user-facing features and creating an intuitive, responsive experience across the platform.",
      emoji: "🎨",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">

        {/* HERO */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            background:
              "linear-gradient(135deg, rgba(59,130,246,.18), rgba(139,92,246,.18))",
            border:
              "1px solid rgba(255,255,255,.08)",
            backdropFilter: "blur(16px)",
            boxShadow:
              "0 20px 50px rgba(0,0,0,.35)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              background:
                "linear-gradient(90deg,#60A5FA,#A78BFA)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            About International Student Companion
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 850,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            A friendly platform built to make life in Canada a little less
            confusing and a lot more organized for international students.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            sx={{
              mt: 3,
              gap: 1,
            }}
          >
            <Chip label="Housing Help" color="primary" />
            <Chip label="Smart Reminders" color="secondary" />
            <Chip label="Student Updates" color="success" />
          </Stack>
        </Box>


        {/* MISSION */}
        <Card sx={{ mb: 5 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              mb={2}
            >
              Our Mission
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
              }}
            >
              Moving to a new country is exciting, but it can also feel
              overwhelming. International Student Companion is designed to help
              students manage important parts of student life in one place —
              finding housing, remembering important deadlines, and staying
              updated with trusted information.
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                mt: 2,
              }}
            >
              Some of us on the team are international students too, so this
              project is built with real experiences in mind. We wanted to
              create something practical, welcoming, and genuinely useful for
              students starting their journey in Canada.
            </Typography>
          </CardContent>
        </Card>


        {/* FEATURES */}
        <Typography
          variant="h4"
          fontWeight={700}
          mb={3}
        >
          What Our Platform Offers
        </Typography>

        <Grid
          container
          spacing={3}
          mb={6}
        >
          {features.map((feature) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={feature.title}
            >
              <Card
                sx={{
                  height: "100%",
                  transition: ".3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow:
                      "0 20px 45px rgba(0,0,0,.45)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3,
                      bgcolor:
                        "rgba(59,130,246,.15)",
                      fontSize: "2rem",
                      mb: 2,
                    }}
                  >
                    {feature.emoji}
                  </Box>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={2}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>


        {/* TEAM */}
        <Typography
          variant="h4"
          fontWeight={700}
          mb={3}
        >
          Meet the Team
        </Typography>

        <Grid
          container
          spacing={3}
          mb={6}
        >
          {team.map((member) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={member.name}
            >
              <Card
                sx={{
                  height:"100%",
                  textAlign:"center",
                  transition:".3s ease",
                  "&:hover":{
                    transform:"translateY(-8px)",
                  },
                }}
              >
                <CardContent sx={{p:3}}>
                  <Typography
                    variant="h3"
                    mb={1}
                  >
                    {member.emoji}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    {member.name}
                  </Typography>

                  <Typography
                    color="primary"
                    fontWeight={700}
                    mt={1}
                  >
                    {member.role}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={2}
                  >
                    {member.note}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>


        {/* CLOSING */}
        <Box
          sx={{
            textAlign:"center",
            p:5,
            borderRadius:5,
            background:
              "linear-gradient(135deg, rgba(59,130,246,.15), rgba(139,92,246,.15))",
            border:
              "1px solid rgba(255,255,255,.08)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            mb={2}
          >
            Built for Students, by Students
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              fontSize:"1.1rem",
              maxWidth:800,
              mx:"auto",
              lineHeight:1.8,
            }}
          >
            Our goal is simple: make the international student journey feel
            more supported, organized, and less stressful. This project is our
            way of turning real student challenges into a helpful digital
            solution.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}