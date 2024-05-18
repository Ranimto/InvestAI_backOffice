import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './accountStyle.css';
import { useSelector } from 'react-redux';


export default function Data() {
  const [accounts, setAccounts] = useState([]);
  const email = useSelector((state) => state.auth.value.email);
  const token = useSelector((state) => state.auth.value.token);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [editedAccount, setEditedAccount] = useState({  
    accountNo:"",
   savingsProductName:"",
  summary:{
    totalDeposits:"",
    totalInterestEarned:"",
    totalInterestPosted:"",
    accountBalance:"",   
    availableBalance:"",
  },
  active:false,
});
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
  })
 

  const fetchUserByEmail= async (email) => {
    const url = `http://localhost:8023/user/findByEmail/${email}`;
    const response = await axios.get(url, {
      headers: {
          'Authorization': `Bearer ${token}` 
      } 
    });
    console.log("Response from server:", response.data, response);
    setUser(response.data);
};


   const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8023/bankAccount/update`, editedAccount, {
        headers: {
            'Authorization': `Bearer ${token}` 
        } 
      });
      const updatedAccounts = accounts.map(account => {
        if (account.id === editedAccount.id) {
          return editedAccount;
        } else {
          return account;
        }
      });
      setAccounts(updatedAccounts);
      console.log("Account updated");
      setEditedAccount(null);
     
      const response1 = await axios.post('http://localhost:8023/user-activity/save',
      {
        userId: account.userId,
        timestamp: new Date(),
        description: 'Bank account updated',
    },
    {
      headers: {
          'Authorization': `Bearer ${token}` 
      } 
    }
      );

    } catch (error) {
      setError("An error occurred while updating the account.");
    } finally {
      setLoading(false);
    }
  };

 const handleEdit = (item) => {
    setEditedAccount(item);
  }; 


  const handleSelectChange = (e) => {
    const { name,value } = e.target;
    setEditedAccount({...editedAccount, [name]: value});
  };



  const fetchAccounts = async () => {
    try {
      setLoading(true);
     const url =` http://localhost:8023/bankAccount/getBankAccountByInvestor/${user.id}`;
      const response = await axios.get(url, 
        {
        headers: {
            'Authorization': `Bearer ${token}` 
        } 
      });
      setAccounts(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during bankAccounts recovery.");
      }
      setLoading(false);
    }
  };


  useEffect(() => {
    if (email)
    fetchUserByEmail(email);
  }, [email]);

  useEffect(() => {
   if (user.id)
    fetchAccounts();
  }, [user.id]);

  const columns = [
    { Header: "accountNo", accessor: "accountNo", width: "20%", align: "left" },
    { Header: "savingsProductName", accessor: "savingsProductName", align: "center" },
    { Header: "totalDeposits", accessor: "totalDeposits", align: "center" },
    { Header: "accountBalance", accessor: "accountBalance", align: "center" },
    { Header: "active", accessor: "active", align: "center" },
    { Header: "actions", accessor: "actions", align: "center" },
  ];

  const rows = accounts.map((item) => ({
    accountNo: (

       <h3 className="accountNo">{item.accountNo}</h3>
    ),
    savingsProductName: (
     <h3>{item.savingsProductName}</h3>
    ),
    totalDeposits: (
    <h3>{item.summary.totalDeposits}</h3>
    ),
    accountBalance: (
    <h3>{item.summary.accountBalance}</h3>
    ),  
     active: (
      editedAccount && editedAccount.accountNo === item.accountNo ?
      <Select variant="outlined" name="active" value={editedAccount.active} onChange={handleSelectChange}>
        <MenuItem value="true">true</MenuItem>
        <MenuItem value="false">false</MenuItem>
      </Select>
      : <h3>{item.active.toString()}</h3>
    ),

    actions: (
      <Grid className="gridButton" variant="contained">
          <button   title='edit' onClick={() => handleEdit(item)}  style={{color:'white', background:"rgb(155, 108, 225)", border:"none" , marginLeft:"3%", cursor:"pointer", width:"2rem",height:"2rem",borderRaduis:"5%"}}><EditIcon/></button>
          <button title='update' style={{color:'white', background:"rgb(233, 172, 15)", border:"none", marginLeft:"3%", cursor:"pointer", width:"2rem",height:"2rem", borderRaduis:"2rem"}}  onClick={handleUpdate}><UpdateIcon/></button>
      </Grid>
    )
  }));

  return { columns, rows };
}
