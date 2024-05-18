import React, {useState } from 'react'
import FeedbackTable from "layouts/feedbacks/FeedbackTableData ";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Button, Card, Grid, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';

const Feedbacks = () => {
  const [showForm,setShowForm]=useState(false);
  const { columns, rows } = FeedbackTable();
  const [error,setError]=useState("");


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
                 Feedbacks Table
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
  
      </MDBox>
    </DashboardLayout>
  )
}

export default Feedbacks