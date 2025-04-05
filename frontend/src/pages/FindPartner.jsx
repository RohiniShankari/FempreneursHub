// import React, { useEffect, useState } from 'react';
// import { Typography, Box, Card, CardContent, Grid, CircularProgress } from '@mui/material';
// import axios from 'axios';

// const FindPartner = () => {
//   const [partners, setPartners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const sellerId = localStorage.getItem('id'); // current user ID

//   useEffect(() => {
//     const fetchPartners = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/users/others/${sellerId}`);
//         setPartners(res.data);
//       } catch (err) {
//         console.error("Error fetching partners:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPartners();
//   }, [sellerId]);

//   if (loading) return <CircularProgress />;

//   return (
//     <Box>
//       <Typography variant="h5" gutterBottom>
//         Find a Business Partner
//       </Typography>
//       <Typography gutterBottom>
//         Discover other women entrepreneurs looking for collaboration opportunities.
//       </Typography>

//       <Grid container spacing={2} sx={{ mt: 2 }}>
//         {partners.length === 0 ? (
//           <Typography>No partners found.</Typography>
//         ) : (
//           partners.map((partner) => (
//             <Grid item xs={12} sm={6} key={partner._id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">{partner.name}</Typography>
//                   <Typography>email: {partner.email}</Typography>
//                   <Typography>Business Type: {partner.businessType}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default FindPartner;
import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, Grid, CircularProgress, Avatar } from '@mui/material';
import axios from 'axios';

const FindPartner = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const sellerId = localStorage.getItem('id'); // current user ID

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/others/${sellerId}`);
        setPartners(res.data);
      } catch (err) {
        console.error("Error fetching partners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, [sellerId]);

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight={600} textAlign="center">
        🤝 Find a Business Partner
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
        Discover other women entrepreneurs looking for collaboration opportunities.
      </Typography>

      <Grid container spacing={3}>
        {partners.length === 0 ? (
          <Typography>No partners found.</Typography>
        ) : (
          partners.map((partner) => (
            <Grid item xs={12} sm={6} md={4} key={partner._id}>
              <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: '#1976d2' }}>
                      {partner.name?.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" fontWeight={600}>
                      {partner.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    📧 Email: {partner.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    🏷️ Business Type: {partner.businessType || 'Not specified'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default FindPartner;

