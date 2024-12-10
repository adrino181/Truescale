import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  useTheme,
  FormControl,
  Input,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { INDUSTRIES, INTERESTS, TEAM_SIZE } from '@/constants';

const useStyles = makeStyles({
  submitBtn: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  cancelBtn: {
    background: 'white',
    color: 'black',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    height: 48,
    padding: '0 30px',
  }
});

const ProfileEdit = ({
  isOpen = false,
  handleClose = () => {},
  profileParams = {},
  handleCallback
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const [params, setParams] = useState(profileParams);
  const [changedParams, setChangedParams] = useState({});

  const handleFormChange = (name, value) => {
      setParams({ ...params, [name]: value});
      setChangedParams({...changedParams, [name]: value});
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      handleCallback(changedParams, params);
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <Grid
      container
      direction="row"
      md={4}
      sm={7}
      justifyContent="center"
      alignItems="center"
      sx={{
        margin: 'auto',
        height: '100%',
        paddingVertical: '10rem',
        borderRadius: 0,
      }}
    >
      <Grid
      direction="row"
      justifyContent="center"
      alignItems="center"
      item
      sx={
        {
          background: theme.palette.tertiary.main,
          height: '100%',
          padding: '2rem 1rem',
        }
      }>
        <form
          sx={{
            height: '100%',
          }}
        >
        <Grid
          container
          justifyContent="space-between"
          rowSpacing={{ xs: 2, sm: 5, md: 3 }}
          columnSpacing={{xs: 2, sm:2, md:3}}
        >
        <Grid item xs={6} md={6}>
          <FormControl>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input id="firstName" value={params.firstName} onChange={(e) => handleFormChange('firstName', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input id="lastName" value={params.lastName} onChange={(e) => handleFormChange('lastName', e.target.value)} />
          </FormControl>
        </Grid>
          <Grid item xs={12} md={12}>
            <FormControl sx={{width: '100%'}} >
               <TextField  maxRows={5} multiline rows={4}  value={params.bio} onChange={(e) => handleFormChange('bio', e.target.value)}/> 
            </FormControl>
          </Grid>
          <Grid item sm={6} md={6}>
            <FormControl sx={{width: '100%'}}>
              <InputLabel htmlFor="location">Location</InputLabel>
              <Input id="location" value={params.location} onChange={(e) => handleFormChange('location', e.target.value)}/>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControl>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input id="phone" value={params.phone} onChange={(e) => handleFormChange('phone', e.target.value)} />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControl
              sx={{
                width: '100%'
              }}
            >
              <InputLabel htmlFor="teamSize">Team Size</InputLabel>
              <Select
                labelId="teamSize"
                value={params.teamSize || ""}
                label="Team Size"
                name="teamSize"
                onChange={(e, some) => handleFormChange('teamSize', e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  TEAM_SIZE.map((item, index) =>
                      <MenuItem key={`item-${index}`} value={item}>{item}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControl sx={{width: '100%'}}>
              <InputLabel htmlFor="industry">Industry</InputLabel>
              <Select
                labelId="industry"
                name="industry"
                label="Industry"
                value={params.industry}
                onChange={(e) => handleFormChange('industry', e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  INDUSTRIES.map((item, index) =>
                      <MenuItem key={`item-${index}`} value={item}>{item}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControl sx={{width: '100%'}}>
              <InputLabel htmlFor="interest">Interest</InputLabel>
              <Select
                labelId="interest"
                id="demo-simple-select-error"
                name="interest"
                label="Interest"
                value={params.interest || ""}
                onChange={(e) => handleFormChange('interest', e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  INTERESTS.map((item, index) =>
                      <MenuItem key={`item-${index}`} value={item}>{item}</MenuItem>
                    )
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12}>
          <button className={classes.cancelBtn} onClick={handleClose} style={{marginRight: '10px'}}>Cancel</button>
            <button className={classes.submitBtn} onClick={handleSubmit}>Submit</button>
          </Grid>
        </Grid>
        </form>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default ProfileEdit;
