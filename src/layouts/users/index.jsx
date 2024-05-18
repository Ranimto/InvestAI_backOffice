import React, { useEffect, useState } from 'react'
import UsersTable from "layouts/users/UsersTableData ";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Button, Card, Grid, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from 'react-router-dom';
import './user.css'
const Users = () => {
  const [showForm,setShowForm]=useState(false);
  const { columns, rows } = UsersTable();
  const [errorForm,setErrorForm]=useState(false);
  const token= useSelector((state)=>state.auth.value.token);
  const [showSuccessMessage,setShowSuccessMessage]=useState(false);
  const [error,setError]=useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [user,setUser]=useState({ 
    id:"",  
    firstname:"",
    lastname:"",
    email :"",
    phone :"",
    city:"",
    nationality:"",
    postcode:"",
    profession:"",
    imageUrl:""
  });


  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8023/user/addUser";
      const response = await axios.post(url, user,  {
        headers: {
            'Authorization': `Bearer ${token}` 
        } 
      });
      console.log('user:', response.data);
      setUsers([...users, response.data]);

     setShowSuccessMessage(true)

      setUser({
    id:"",  
    firstname:"",
    lastname:"",
    email :"",
    phone :"",
    city:"",
    nationality:"",
    postcode:"",
    profession:"",
    imageUrl:""
      });
    } catch (error) {
      setError(error.response.data);
      setErrorForm(true);
    
    }
  };

  const handleAddAccountClick=()=>{
    setShowForm(true);
  }
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };


  return (
    <DashboardLayout>
       <DashboardNavbar/>
  <br/>
        <Button variant="contained" className='roundedAdd' onClick={handleAddAccountClick}><AddRoundedIcon/>Add new User</Button>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={2}
                px={2}
                variant="gradient"
                bgColor="secondary"
                borderRadius="lg"
                coloredShadow="info"
              >
                <h5 style={{color :'white'}} >
                 Users Table
                </h5>
                
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>


        { showForm &&
<Modal open={showForm} >
        <div className="modalContent"  >
        <div >
          <form  className='stockSellForm' style={{ height: '100px'}}  >
          <p style={{color:"rgba(0, 0, 0, 0.911)", fontSize:"14px" ,paddingBottom:"5%"}}>Make your first step and  <strong style={{color:'blueviolet'}}>SELL</strong> a stock</p>
            
          <TextField  name="firstname" 
            label="firstname" 
            variant="outlined"
            type="text" 
            fullWidth  
            value={user.firstname}  
            onChange={handleInputChange} 
            margin="normal"
            required /> 

            <TextField  name="lastname" 
            label="lastname" 
            variant="outlined" 
            fullWidth  
            value={user.lastname}  
            onChange={handleInputChange} 
            margin="normal"
            required />  

           <TextField 
           name="email" 
           label="email" 
           variant="outlined" 
            fullWidth 
            type="email"
            value={user.email} 
            onChange={handleInputChange}
            margin="normal"
            required />

            <TextField  name="password" 
            label="password" 
            variant="outlined"
            type="password" 
            fullWidth  
            value={user.password}  
            onChange={handleInputChange} 
            margin="normal"
            required /> 

           <TextField name="phone" 
           label="phone" 
           variant="outlined" 
            fullWidth 
            value={user.phone} 
            type="number"
            onChange={handleInputChange}
            margin="normal"
            required />

            <TextField  name="profession" 
            label="profession" 
            variant="outlined" 
            fullWidth  
            value={user.profession}  
            onChange={handleInputChange} 
            margin="normal"
            required />  

            <TextField 
           name="city" 
           label="city" 
           variant="outlined" 
           fullWidth 
           type="text"
           value={user.city} 
           onChange={handleInputChange}
           margin="normal"
           required />
      
           <div className="FormClass" display='grid'>            
           <Button variant="contained" type="submit" className='btnRecommandation' style={{backgroundColor:'red'}} onClick={handleSubmit}>Add User</Button> 
           {showSuccessMessage &&  (<p style={{marginTop:"-2%", fontWeight:"100" ,color:"black" ,width:"100%"}}>User has been added <strong style={{color:"green"}}>Successfully !</strong></p>)}
             { error && (<p style={{marginTop:"-2%", fontWeight:"100", color:"black",width:"100%"}}> <strong style={{color:"red"}}>Failed</strong> to add user ! <strong>{errorMessage} !</strong> </p>)}        
           <Link to="/users" onClick={()=>{setShowForm(false)}} className='back' > <ReplyIcon/> Back</Link>
           </div>     
          </form>
          </div> 
        </div>
      </Modal>
} 
  
      </MDBox>
    </DashboardLayout>
  )
}

export default Users