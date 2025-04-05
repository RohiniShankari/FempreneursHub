import React from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const Tenders = () => {
  const dummyTenders = [
    {
      id: 1,
      title: 'Government Scheme for Women Entrepreneurs',
      deadline: 'April 15, 2025',
      email: 'supportWomenEntrepreneurs@gmail.com',
    },
    {
      id: 2,
      title: 'Startup India Seed Fund',
      deadline: 'May 1, 2025',
      email: 'supportSeedFund@gmail.com',
    },
    {
      id: 3,
      title: 'Technology Upgrade Assistance Program',
      deadline: 'May 20, 2025',
      email: 'techUpgrade@msme.gov.in',
    },
    {
      id: 4,
      title: 'Women-Led MSME Export Booster',
      deadline: 'June 10, 2025',
      email: 'exportBooster@msmeconnect.in',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        📢 Tenders & Schemes
      </Typography>
      <Typography sx={{ mb: 3, color: 'text.secondary' }}>
        Explore available tenders, schemes, and funding opportunities tailored for MSMEs.
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <List>
          {dummyTenders.map((tender, index) => (
            <React.Fragment key={tender.id}>
              <ListItem
                sx={{
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    borderRadius: 2,
                  },
                  transition: '0.3s',
                  alignItems: 'flex-start',
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {tender.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Deadline: {tender.deadline}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Contact: {tender.email}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index !== dummyTenders.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Tenders;
