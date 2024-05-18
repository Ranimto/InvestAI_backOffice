import React, { useEffect, useState } from 'react'
import CompaniesData from "layouts/companies/CompaniesTableData ";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Button, Card, Grid, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Link } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';

const Companies = () => {
  const [showForm,setShowForm]=useState(false);
  const { columns, rows } = CompaniesData();
  const [companies, setCompanies] = useState([]);
  const [errorForm,setErrorForm]=useState(false);
  const [error,setError]=useState("");
  const [showSuccessMessage,setShowSuccessMessage]=useState(false);
 const token= useSelector((state)=>state.auth.value.token);

  const [company, setCompany] = useState({
    activity : "",
    companyName : "",
    reportedCurrency  : "",
    operatingCashflow : 0,
   paymentsForOperatingActivities : 0,
  proceedsFromOperatingActivities : 0,
  changeInOperatingLiabilities  : 0,
     changeInOperatingAssets  : 0,
     depreciationDepletionAndAmortization : 0,
     capitalExpenditures  : 0,
     changeInReceivables : 0,
     changeInInventory  : 0,
     profitLoss :0,
     cashflowFromInvestment : 0,
     cashflowFromFinancing : 0,
     proceedsFromRepaymentsOfShortTermDebt : 0,
     paymentsForRepurchaseOfCommonStock : 0,
     paymentsForRepurchaseOfEquity : 0,
     paymentsForRepurchaseOfPreferredStock : 0,
     dividendPayout : 0,
     dividendPayoutCommonStock : 0,
     dividendPayoutPreferredStock : 0,
     proceedsFromIssuanceOfCommonStock : 0,
     proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet : 0,
     proceedsFromIssuanceOfPreferredStock : 0,
     proceedsFromRepurchaseOfEquity : 0,
     proceedsFromSaleOfTreasuryStock : 0,
     changeInExchangeRate : 0,
     netIncome : 0,
     accountType : 0,
     RIB  : "",
     description  : "",
  });


  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8023/company/add";
      const response = await axios.post(url, company, {
        headers: {
            'Authorization': `Bearer ${token}` 
        } 
      });
      console.log('company:', response.data);
      setCompanies([...companies, response.data]);

     setShowSuccessMessage(true)

      setCompany({
       activity : "",
        companyName : "",
        reportedCurrency  : "",
        operatingCashflow : 0,
       paymentsForOperatingActivities : 0,
      proceedsFromOperatingActivities : 0,
      changeInOperatingLiabilities  : 0,
         changeInOperatingAssets  : 0,
         depreciationDepletionAndAmortization : 0,
         capitalExpenditures  : 0,
         changeInReceivables : 0,
         changeInInventory  : 0,
         profitLoss :0,
         cashflowFromInvestment : 0,
         cashflowFromFinancing : 0,
         proceedsFromRepaymentsOfShortTermDebt : 0,
         paymentsForRepurchaseOfCommonStock : 0,
         paymentsForRepurchaseOfEquity : 0,
         paymentsForRepurchaseOfPreferredStock : 0,
         dividendPayout : 0,
         dividendPayoutCommonStock : 0,
         dividendPayoutPreferredStock : 0,
         proceedsFromIssuanceOfCommonStock : 0,
         proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet : 0,
         proceedsFromIssuanceOfPreferredStock : 0,
         proceedsFromRepurchaseOfEquity : 0,
         proceedsFromSaleOfTreasuryStock : 0,
         changeInExchangeRate : 0,
         netIncome : 0,
         accountType : 0,
         RIB  : "",
         description  : "",
      });
    } catch (error) {
      setError(error.response.data);
      setErrorForm(true);
    
    }
  };


  const handleAddAccountClick=()=>{
    setShowForm(true);
  }

  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    setCompany({
      ...company,
      [name]: value
    });
  };



  return (
    <DashboardLayout>
       <DashboardNavbar/>
  <br/> 
        <Button variant="contained" className='roundedAdd' onClick={handleAddAccountClick}><AddRoundedIcon/>Add new Company</Button>
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
                 Companies Table
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
        {errorForm && (
  <Modal open={errorForm} >
    <Grid className='errorForm'>
    <p> <ErrorRoundedIcon/> {error.message}</p>
    <button onClick={()=>setErrorForm(false)}>Cancel</button>
    </Grid>
  </Modal>
)}

<Modal open={showForm}>
  <div className="modalContent">
    <div>
      <form className="stockSellForm" style={{ height: "100px" }}>
        <p style={{ color: "rgba(0, 0, 0, 0.911)", fontSize: "14px", paddingBottom: "5%" }}>
          Make your first step and <strong style={{ color: "blueviolet" }}>SELL</strong> a stock
        </p>

        <Grid container spacing={2}>
          {/* Première colonne */}
          <Grid item xs={4}>
            <TextField
              name="activity"
              label="Activity"
              variant="outlined"
              type="text"
              fullWidth
              value={company.activity}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="companyName"
              label="Company Name"
              variant="outlined"
              fullWidth
              value={company.companyName}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="reportedCurrency"
              label="Reported Currency"
              variant="outlined"
              fullWidth
              value={company.reportedCurrency}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="RIB"
              label="RIB"
              variant="outlined"
              fullWidth
              value={company.RIB}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              value={company.description}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            {/* Ajoutez d'autres champs pour cette colonne */}
          </Grid>

          {/* Deuxième colonne */}
          <Grid item xs={4}>
            <TextField
              name="operatingCashflow"
              label="Operating Cashflow"
              variant="outlined"
              type="number"
              fullWidth
              value={company.operatingCashflow}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="paymentsForOperatingActivities"
              label="Payments For Operating Activities"
              variant="outlined"
              type="number"
              fullWidth
              value={company.paymentsForOperatingActivities}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="proceedsFromOperatingActivities"
              label="Proceeds From Operating Activities"
              variant="outlined"
              type="number"
              fullWidth
              value={company.proceedsFromOperatingActivities}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="changeInOperatingAssets"
              label="Change In Operating Assets"
              variant="outlined"
              type="number"
              fullWidth
              value={company.changeInOperatingAssets}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="depreciationDepletionAndAmortization"
              label="Depreciation, Depletion And Amortization"
              variant="outlined"
              type="number"
              fullWidth
              value={company.depreciationDepletionAndAmortization}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
          
          </Grid>

     
          <Grid item xs={4}>
            <TextField
              name="changeInOperatingLiabilities"
              label="Change In Operating Liabilities"
              variant="outlined"
              type="number"
              fullWidth
              value={company.changeInOperatingLiabilities}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="capitalExpenditures"
              label="Capital Expenditures"
              variant="outlined"
              type="number"
              fullWidth
              value={company.capitalExpenditures}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="changeInReceivables"
              label="Change In Receivables"
              variant="outlined"
              type="number"
              fullWidth
              value={company.changeInReceivables}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="profitLoss"
              label="Profit Loss"
              variant="outlined"
              type="number"
              fullWidth
              value={company.profitLoss}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
            <TextField
              name="cashflowFromInvestment"
              label="Cashflow From Investment"
              variant="outlined"
              type="number"
              fullWidth
              value={company.cashflowFromInvestment}
              onChange={handleCompanyInputChange}
              margin="normal"
              required
            />
          </Grid>
        </Grid>

        <div className="FormClass" display="grid">
          <Button variant="contained" type="submit" className="btnRecommandation" style={{ backgroundColor: "red" }} onClick={handleSubmit}>
            Add company
          </Button>
          {showSuccessMessage && (
            <p style={{ marginTop: "-2%", fontWeight: "100", color: "black", width: "100%" }}>
              company has been added <strong style={{ color: "green" }}>Successfully !</strong>
            </p>
          )}
          {error && (
            <p style={{ marginTop: "-2%", fontWeight: "100", color: "black", width: "100%" }}>
              <strong style={{ color: "red" }}>Failed</strong> to add company ! <strong>{errorMessage} !</strong>{" "}
            </p>
          )}
          <Link to="/companies" onClick={() => setShowForm(false)} className="back">
            <ReplyIcon /> Back
          </Link>
        </div>
      </form>
    </div>
  </div>
</Modal>;

      </MDBox>
    </DashboardLayout>
  )
}

export default Companies