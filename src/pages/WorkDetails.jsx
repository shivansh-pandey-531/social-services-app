import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, IconButton } from '@mui/material';
import { Search, X } from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';
import { motion, AnimatePresence } from 'framer-motion';
import dummyOffers from '../static/dummyData_ServicesOffered'
import { useUser } from '../UserContext';
import LockIcon from '@mui/icons-material/Lock';
import AccessLockedModal from '../components/modals/AccessLockedModal';


const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};



const WorkDetails = () => {

  const { user } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(!user.membershipActive); // Open modal if no membership

  const [selectedServices, setSelectedServices] = useState([
    dummyOffers[0], // Housekeeping Services
    dummyOffers[1], // Deep Cleaning
  ]);
  const [workExperience, setWorkExperience] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [selectedDays, setSelectedDays] = useState([...daysOfWeek]); // All selected by default

  const handleServiceRemove = (serviceToRemove) => {
    setSelectedServices(selectedServices.filter(service => service.value !== serviceToRemove.value));
  };

  const handleDayToggle = (day) => {
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleEdit = () => {
    const formData = {
      services: selectedServices.map(s => s.value),
      workExperience,
      workingHours,
      workingDays: selectedDays,
    };
    console.log('Collected Work Details:', formData);
  };

  // Redirect to dashboard when modal closes
  const handleModalClose = () => {
    navigate('/dashboard');
  };


  return (
    <Box className='p-5 sm:p-8 w-full h-full'>
      {/* Access Locked Modal */}
      <AccessLockedModal
        open={isModalOpen}
        onClose={handleModalClose}
        heading="Access Restricted"
        subheading="Subscribe to update your availability and unlock premium features."
      />


      {/* Header */}
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E0E0E0',
          pb: 2,
          mb: 2
        }}
      >
        <Typography variant="h2" sx={{ fontSize: '2rem', fontWeight: 'semibold', color: '#4A5568' }}>
          Work Details
        </Typography>
        {/* Yellow Lock Icon */}
        {
          !user.membershipActive  &&  <LockIcon sx={{ fontSize: 24, color: '#F59E0B' }} />
        }
      </Box >

        {/* Animated Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key="work-details-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <Box sx={{ p: { xs: 0.5, sm: 1 }, display: 'flex', maxWidth: { xs: '100%', sm: '80%' }, flexDirection: 'column', gap: { xs: 4, sm: 7 }, flex: 1, overflow: 'auto' }}>
              
              {/* Services Offered */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pb:0.5
                  }}>
                    <Search size={20} color="#2563EB" />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 500, 
                      color: 'rgba(0,0,0,0.7)',
                      fontSize: '1.125rem'
                    }}
                  >
                    Services Offered
                  </Typography>
                </Box>
                
                <Autocomplete
                  multiple
                  options={dummyOffers}
                  getOptionLabel={(option) => option.label}
                  value={selectedServices}
                  onChange={(event, newValue) => setSelectedServices(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={
                        selectedServices.length === 0
                          ? "Search and select services..."
                          : `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`
                      }
                      variant="outlined"
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          backgroundColor: '#F9FAFB',
                          '& fieldset': { 
                            borderColor: '#D1D5DB',
                            borderWidth: '1px'
                          },
                          '&:hover fieldset': { borderColor: '#9CA3AF' },
                          '&.Mui-focused fieldset': { 
                            borderColor: '#2563EB',
                            borderWidth: '2px'
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: '#374151',
                          fontSize: '0.875rem',
                          py: '12px',
                        },
                      }}
                    />
                  )}
                  sx={{
                    '& .MuiAutocomplete-paper': {
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    }
                  }}
                />
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {selectedServices.map(service => (
                    <Box
                      key={service.value}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#EFF6FF',
                        borderRadius: '8px',
                        px: 2,
                        py: 1,
                        fontSize: '0.875rem',
                        color: '#1D4ED8',
                        fontWeight: 500,
                        border: '1px solid #DBEAFE',
                      }}
                    >
                      {service.label}
                      <IconButton
                        size="small"
                        onClick={() => handleServiceRemove(service)}
                        sx={{ 
                          ml: 1, 
                          p: 0.5, 
                          color: '#1D4ED8',
                          '&:hover': { backgroundColor: '#DBEAFE' }
                        }}
                      >
                        <X size={14} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Work Experience */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Typography sx={{ color: '#16A34A', fontWeight: 600 }}>★</Typography>
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 500, 
                      color: 'rgba(0,0,0,0.7)',
                      fontSize: '1.125rem'
                    }}
                  >
                    Work Experience
                  </Typography>
                </Box>
                
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="e.g., 4 years & 3 months"
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                  sx={{
                    maxWidth: '500px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#F9FAFB',
                      '& fieldset': { 
                        borderColor: '#D1D5DB',
                        borderWidth: '1px'
                      },
                      '&:hover fieldset': { borderColor: '#9CA3AF' },
                      '&.Mui-focused fieldset': { 
                        borderColor: '#2563EB',
                        borderWidth: '2px'
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#374151',
                      fontSize: '0.875rem',
                      py: '12px',
                    },
                  }}
                />
              </Box>

              {/* Working Hours */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Typography sx={{ color: '#9333EA', fontWeight: 600 }}>🕐</Typography>
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 500, 
                      color: 'rgba(0,0,0,0.7)',
                      fontSize: '1.125rem'
                    }}
                  >
                    Working Hours
                  </Typography>
                </Box>
                
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="e.g., 8:00AM - 5:00PM"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  sx={{
                    maxWidth: '450px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#F9FAFB',
                      '& fieldset': { 
                        borderColor: '#D1D5DB',
                        borderWidth: '1px'
                      },
                      '&:hover fieldset': { borderColor: '#9CA3AF' },
                      '&.Mui-focused fieldset': { 
                        borderColor: '#2563EB',
                        borderWidth: '2px'
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: '#374151',
                      fontSize: '0.875rem',
                      py: '12px',
                    },
                  }}
                />
              </Box>

              {/* Working Days */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Typography sx={{ color: '#D97706', fontWeight: 600 }}>📅</Typography>
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 500, 
                      color: 'rgba(0,0,0,0.7)',
                      fontSize: '1.125rem'
                    }}
                  >
                    Working Days
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {daysOfWeek.map(day => (
                    <Button
                      key={day}
                      variant={selectedDays.includes(day) ? 'contained' : 'outlined'}
                      onClick={() => handleDayToggle(day)}
                      sx={{
                        minWidth: { xs: '55px', sm: '70px' },
                        height: { xs: '38px', sm: '48px' },
                        borderRadius: '12px',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 600,
                        textTransform: 'none',
                        backgroundColor: selectedDays.includes(day) ? 'transparent' : '#2563EB',
                        color: selectedDays.includes(day) ? '#6B7280' : 'white',
                        borderColor: selectedDays.includes(day) ? '#D1D5DB' : '#2563EB',
                        '&:hover': {
                          backgroundColor: selectedDays.includes(day) ? '#F3F4F6' : '#1D4ED8',
                          borderColor: selectedDays.includes(day) ? '#9CA3AF' : '#1D4ED8',
                        },
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Footer */}
            <Box sx={{ 
              mt: 2,
              width: '95%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <Button
                variant="contained"
                onClick={handleEdit}
                sx={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '8px',
                  py: { xs: '6px', sm: '8px' },
                  px: { xs: '16px', sm: '24px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#2563EB',
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </motion.div>
        </AnimatePresence>
    </Box>
  );
};

export default WorkDetails;