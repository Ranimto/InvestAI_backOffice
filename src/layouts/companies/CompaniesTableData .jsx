import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MDBox from 'components/MDBox';
import { Grid, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';



export default function Data() {
  const [otherCompanies, setOtherCompanies] = useState([]);
  const [editedCompany, setEditedCompany] = useState([]);
  const token= useSelector((state)=>state.auth.value.token);
  const [Company, setCompany] = useState({
    id: "",
    activity: "",
    companyName: "",
    reportedCurrency: "",
    operatingCashflow: 0.0,
    paymentsForOperatingActivities: 0.0,
    capitalExpenditures: 0.0,
    cashflowFromInvestment: 0.0,
    cashflowFromFinancing: 0.0,
    dividendPayout: 0.0,
    changeInExchangeRate: 0.0,
    netIncome: 0.0,
    RIB: 0.0,
  });
  const [error, setError] = useState(null);


const fetchCompanies= async () => {
  try {
    const url = `http://localhost:8023/company/getAll`;
    const response = await axios.get(url, {
      headers: {
          'Authorization': `Bearer ${token}` 
      } 
    });
    setOtherCompanies(response.data);
    setError(null);
  } catch (error) {
    if (error.response) {
      setError(error.response.data.message);
    } else {
      setError("An error occurred during companies recovery.");
    }
  }
};

const handleEdit = (item) => {
  setEditedCompany(item);
}; 

const handleInputChange = (e) => {
  const { name,value } = e.target;
  setEditedCompany({...editedCompany, [name]: value});
};

const handleUpdate = async () => {
  try {
    await axios.put(`http://localhost:8023/company/update`, editedCompany,  {
      headers: {
          'Authorization': `Bearer ${token}` 
      } 
    });
    const updatedCompanies = otherCompanies.map(company => {
      if (company.id === editedCompany.id) {
        return editedCompany;
      } else {
        return company;
      }
    });
    setOtherCompanies(updatedCompanies);
    console.log("companies updated");
    setEditedUser(null);
  

  } catch (error) {
    setError("An error occurred while updating the company.");
  } 
};

  useEffect(() => {
   fetchCompanies()
  }, []);

 

  const columns = [
  
    { Header: "Name", accessor: "name", align: "center" },
    { Header: "Activity", accessor: "activity", align: "left" },
    { Header: "Reported_Currency", accessor: "reportedCurrency", align: "center" },
    { Header: "payments_ForOperating_Activities", accessor: "paymentsForOperatingActivities", align: "center" },
    { Header: "Capital_Expenditures", accessor: "capitalExpenditures", align: "center" },
    { Header: "Dividend_Payout", accessor: "dividendPayout", align: "center" },
    { Header: "Change_in_Exchange_Rate", accessor: "changeInExchangeRate", align: "center" },
    { Header: "Net_Income", accessor: "netIncome", align: "center" },
    { Header: "RIB", accessor: "RIB", align: "center" },
    { Header: "actions", accessor: "actions", align: "center" },
  ];

  const rows = otherCompanies.map((item,index) => ({

    name: (
        <MDBox width="8rem" textAlign="center">
        {editedCompany && editedCompany.id==item.id ?
         <TextField label="companyName" name="companyName" value={editedCompany.companyName} onChange={handleInputChange} fullWidth>
        </TextField> : 
        <h3>{item.companyName}</h3>
        }
        </MDBox>
        ),
    activity: (
      <MDBox width="8rem" textAlign="center">
      {editedCompany && editedCompany.id==item.id ?
       <TextField label="activity" name="activity" value={editedCompany.activity} onChange={handleInputChange} fullWidth>
      </TextField> : 
      <h3>{item.activity}</h3>
      }
      </MDBox>
      ),
    reportedCurrency: (
        <MDBox width="8rem" textAlign="center">
        {editedCompany && editedCompany.id==item.id ?
         <TextField label="reportedCurrency" name="reportedCurrency" value={editedCompany.reportedCurrency} onChange={handleInputChange} fullWidth>
        </TextField> : 
        <h3>{item.reportedCurrency}</h3>
        }
        </MDBox>
        ),
   
      paymentsForOperatingActivities: (
        <MDBox width="8rem" textAlign="center">
        {editedCompany && editedCompany.id==item.id ?
         <TextField label="operatingCashflow" name="operatingCashflow" value={editedCompany.operatingCashflow} onChange={handleInputChange} fullWidth>
        </TextField> : 
        <h3>{item.operatingCashflow}</h3>
        }
        </MDBox>
        ),
   
      paymentsForOperatingActivities: (
        <MDBox width="8rem" textAlign="center">
        {editedCompany && editedCompany.id==item.id ?
         <TextField label="paymentsForOperatingActivities" name="paymentsForOperatingActivities" value={editedCompany.paymentsForOperatingActivities} onChange={handleInputChange} fullWidth>
        </TextField> : 
        <h3>{item.paymentsForOperatingActivities}</h3>
        }
        </MDBox>
        ),
    
    capitalExpenditures: (
        <MDBox width="8rem" textAlign="center">
        {editedCompany && editedCompany.id==item.id ?
         <TextField label="capitalExpenditures" name="capitalExpenditures" value={editedCompany.capitalExpenditures} onChange={handleInputChange} fullWidth>
        </TextField> : 
        <h3>{item.capitalExpenditures}</h3>
        }
        </MDBox>
        ),
  
    dividendPayout: (
        <MDBox width="8rem" textAlign="center">
        {editedCompany && editedCompany.id==item.id ?
         <TextField label="dividendPayout" name="dividendPayout" value={editedCompany.dividendPayout} onChange={handleInputChange} fullWidth>
        </TextField> : 
        <h3>{item.dividendPayout}</h3>
        }
        </MDBox>
        ),
  
    changeInExchangeRate: (
        <MDBox width="8rem" textAlign="center">
        {editedCompany && editedCompany.id==item.id ?
         <TextField label="changeInExchangeRate" name="changeInExchangeRate" value={editedCompany.changeInExchangeRate} onChange={handleInputChange} fullWidth>
        </TextField> : 
        <h3>{item.changeInExchangeRate}</h3>
        }
        </MDBox>
        ),
    netIncome: (
      <MDBox width="8rem" textAlign="center">
      {editedCompany && editedCompany.id==item.id ?
       <TextField label="netIncome" name="netIncome" value={editedCompany.netIncome} onChange={handleInputChange} fullWidth>
      </TextField> : 
      <h3>{item.netIncome}</h3>
      }
      </MDBox>
      ),
    RIB: (
      <MDBox width="8rem" textAlign="center">
      {editedCompany && editedCompany.id==item.id ?
       <TextField label="RIB" name="RIB" value={editedCompany.RIB} onChange={handleInputChange} fullWidth>
      </TextField> : 
      <h3>{item.RIB}</h3>
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