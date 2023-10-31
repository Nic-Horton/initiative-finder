import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, FormControl, FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';

function Login() {
  return (
    <>
    <Box
      component="form"
      sx={{
      alignItems:'center',
      }}
      noValidate
      autoComplete="off"
    >
      <Container
       sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems:'center',
      }}>

          <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent:"center",
            alignItems:'center',
            backgroundColor:'transparent',
            color:'white',
          width: 500,
          border:1,
          marginTop: 5,

          marginBottom:10,
          }}
          >
           <h1>Initiative Finder</h1> 
            </Box>



        <FormControl
              sx={{                
                display: "flex",
                backgroundColor:'white',
                flexWrap: "wrap",
                flexDirection:"row",
                border: 1,
                borderRadius: 2,
                padding: 10,
                paddingBottom: 20,
                alignContent: "left",
                marginLeft: 3,
                width: 300,
                justifyContent: 'center'
              }}
            >
              <FormLabel > Let's Start the Fight! </FormLabel>
              <TextField
                value=""
                placeholder="Enter Username"
                helperText="No more than 30 characters please!"
                variant="outlined"
                color='success'
           
              ></TextField>


              <TextField
                sx={{ marginBottom: 2 }}
                type="password"
                placeholder='Enter Password'
                id="outlined-basic"
                variant="outlined"

              />

          <Container sx={{ display:"flex", flexDirection:"row",
        justifyContent: 'center'}} > 
          <Button variant="contained" color="success">
                Login
                </Button>
                <Button color="error" variant="contained" sx={{marginLeft:5}}>Register</Button>
                </Container>
            </FormControl>

       </Container>

    </Box>
    </>
  )
}


  export default Login;
  