import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import MDBox from 'components/MDBox';


export default function Data() {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState([]);
  const email = useSelector((state) => state.auth.value.email);
  const token= useSelector((state)=>state.auth.value.token);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8023/user/delete/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError("An error occurred while deleting the user.");
    } finally {
      setLoading(false);
    }
  };

   const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8023/user/update`, editedUser, {
        headers: {
            'Authorization': `Bearer ${token}` 
        } 
      });
      const updatedUsers = users.map(user => {
        if (user.id === editedUser.id) {
          return editedUser;
        } else {
          return user;
        }
      });
      setUsers(updatedUsers);
      console.log("users updated");
      setEditedUser(null);
    

    } catch (error) {
      setError("An error occurred while updating the user.");
    } finally {
      setLoading(false);
    }
  };

 const handleEdit = (item) => {
    setEditedUser(item);
  }; 

  const handleInputChange = (e) => {
    const { name,value } = e.target;
    setEditedUser({...editedUser, [name]: value});
  };

  const fetchUsers = async () => {
    try {
     const url =` http://localhost:8023/user/allUsers`;
      const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}` 
        } 
      });
      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during users recovery.");
      }
    }
  };


  useEffect(() => {

    fetchUsers();
  }, []);

  const columns = [
    { Header: "firstname", accessor: "firstname", width: "10%", align: "center" },
    { Header: "lastname", accessor: "lastname", align: "center" },
    { Header: "email", accessor: "email", align: "center" },
    { Header: "address", accessor: "address", align: "center" },
    { Header: "phone", accessor: "phone", align: "center" },
    { Header: "city", accessor: "city", align: "center" },
    { Header: "active", accessor: "active", align: "center" },
    { Header: "actions", accessor: "actions", align: "center" },
  ];

  const rows = users.map((item) => ({
    firstname: (
      <MDBox width="8rem" textAlign="center">
      {editedUser && editedUser.id==item.id ?
       <TextField label="firstname" name="firstname" value={editedUser.firstname} onChange={handleInputChange} fullWidth>
      </TextField> : 
      <h3>{item.firstname}</h3>
      }
      </MDBox>
      ),
    lastname: (
      <MDBox width="8rem" textAlign="center">
      {editedUser && editedUser.id==item.id ?
       <TextField label="lastname" name="lastname" value={editedUser.lastname} onChange={handleInputChange} fullWidth>
      </TextField> : 
      <h3>{item.lastname}</h3>
      }
      </MDBox>
      ),
    email: (
      <MDBox width="8rem" textAlign="center">
      {editedUser && editedUser.id==item.id ?
       <TextField label="Address" name="address" value={editedUser.address} onChange={handleInputChange} fullWidth>
      </TextField> : 
      <h3>{item.email}</h3>
      }
      </MDBox>
      ),
    address: (
      <MDBox width="8rem" textAlign="center">
      {editedUser && editedUser.id==item.id ?
       <TextField label="Address" name="address" value={editedUser.address} onChange={handleInputChange} fullWidth>
      </TextField> : 
      <h3>{item.address}</h3>
      }
      </MDBox>
      ),
    phone: (
      <MDBox width="8rem" textAlign="center">
      {editedUser && editedUser.id==item.id ?
       <TextField label="Phone" name="phone" value={editedUser.phone} onChange={handleInputChange} fullWidth>
      </TextField> : 
      <h3>{item.phone}</h3>
      }
      </MDBox>
      ),
  
     city: (
     <MDBox width="8rem" textAlign="center">
     {editedUser && editedUser.id==item.id ?
      <TextField label="City" name="city" value={editedUser.city} onChange={handleInputChange} fullWidth>
     </TextField> : 
     <h3>{item.city}</h3>
     }
     </MDBox>
     ),

    actions: (
      <Grid className="gridButton" variant="contained" gap="2%">
          <button   title='edit' onClick={() => handleEdit(item)}  style={{color:'white', background:"rgb(155, 108, 225)", border:"none" , marginLeft:"3%", cursor:"pointer", width:"2rem",height:"2rem",borderRaduis:"5%"}}><EditIcon/></button>
          <button title='update' style={{color:'white', background:"rgb(233, 172, 15)", border:"none", marginLeft:"3%", cursor:"pointer", width:"2rem",height:"2rem", borderRaduis:"2rem"}}  onClick={handleUpdate}><UpdateIcon/></button>
          <button   title='delete'  style={{color:'white' , background:"rgb(195, 7, 0)", border:"none", marginLeft:"3%", cursor:"pointer", width:"2rem",height:"2rem", borderRaduis:"2rem"}}  onClick={() => handleDelete(item.id)}><DeleteIcon/></button>
      </Grid>
    )
  }));

  return { columns, rows };
}
