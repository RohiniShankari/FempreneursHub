import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Link } from '@mui/material';

const CommunitySessions = () => {
  const demoSessions = [
    {
      title: 'Women in Tech: Breaking Barriers',
      date: 'April 10, 2025',
      time: '5:00 PM - 6:30 PM',
      host: 'Anita Sharma',
      link: 'https://zoom.us/j/1234567890',
    },
    {
      title: 'Marketing Masterclass for MSMEs',
      date: 'April 15, 2025',
      time: '4:00 PM - 5:30 PM',
      host: 'Priya Verma',
      link: 'https://meet.google.com/abc-defg-hij',
    },
    {
      title: 'Funding and Pitching: A Beginner’s Guide',
      date: 'April 20, 2025',
      time: '6:00 PM - 7:30 PM',
      host: 'Ritika Mehra',
      link: 'https://zoom.us/j/0987654321',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Community Sessions
      </Typography>
      <Typography variant="body1" gutterBottom>
        Join, host, or explore upcoming sessions curated for women entrepreneurs.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {demoSessions.map((session, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{session.title}</Typography>
                <Typography variant="body2">📅 {session.date}</Typography>
                <Typography variant="body2">🕓 {session.time}</Typography>
                <Typography variant="body2">👩‍💼 Host: {session.host}</Typography>
                <Link
                  href={session.link}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  sx={{ display: 'block', mt: 2, fontWeight: 500 }}
                >
                  👉 Join Session
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CommunitySessions;

