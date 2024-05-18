import { Button, Card, Grid, InputLabel, MenuItem, Modal, Select, Table, TextField } from '@mui/material'
import React, {useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux'
import ComponentNavbar from 'examples/Navbars/ComponentNavbar'
import MDButton from 'components/MDButton';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import Box from '@mui/material/Box';
import Loading from 'assets/images/giphy.gif'
import logo from 'assets/images/logo.jpeg'
import MDProgress from 'components/MDProgress';
import ReplyIcon from '@mui/icons-material/Reply';


const CompaniesRecommandations = () => {

    const [showForm,setShowForm]= useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCompanyName,setSelectedCompanyName]= useState("")
    const email=useSelector((state)=> state.auth.value.email);
    const token= useSelector((state)=>state.auth.value.token);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [predictedRisk, setPredictedRisk] = useState(0);
    const [showProfileData, setShowProfileData] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [error, setError] = useState(false);
    const [companies,setCompanies]=useState([]);
    const[analyseResponse, setAnalyseResponse]=useState("")
    const[analyseCompany, setAnalyseCompany]=useState("")
    const[analyseMessage, setAnalyseMessage]=useState(false)
    const[showStrategy, setShowStrategy]=useState(false)
    
    const [investment, setInvestment] = useState({
      companyName:"",
      type:"",
      investmentAmount :"",
      startDate :"",
      duration :"",
      status: "IN_PROGRESS"
      
    });   
    const [user,setUser]=useState({ 
      id:"",  
      firstname:"",
      lastname:"",
      email :"",
      phone :"",
      city:"",
      nationality: "",
      postCode: 0,
      profession: ""
    })

    const fetchUserByEmail= async(email)=>{
      const response= await axios.get(`http://localhost:8023/user/findByEmail/${email}`, {
        headers: {
            'Authorization': `Bearer ${token}` 
        } 
      });
      setUser( response.data);  
      setInvestment({ ...investment, userId: response.data.id });
    }

  

   const handleShowForm=(name)=>{
      setShowForm(true);
      setSelectedCompanyName(name);
    }
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInvestment({ ...investment, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault(); 

    
      const updatedInvestment = { ...investment, companyName: selectedCompanyName,
        investmentAmount:investment.numberOfStock*investment.stockActualPrice,
        startDate: new Date()};
      setInvestment(updatedInvestment);

      //save it in the historical activity 
      const investmentDescription = `Adding new investment in the ${updatedInvestment.companyName} company with amount : ${updatedInvestment.investmentAmount} $`;
      const response1 = await axios.post('http://localhost:8023/user-activity/save',
      {
        userId: user.id,
        timestamp: new Date(),
        description: investmentDescription,
      }
      );
      console.log('updatedInvestment', updatedInvestment)
      const response = await axios.post("http://localhost:8023/investment/add", updatedInvestment).then(() => {

        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);

          setInvestment({
            userId: user.id,
            type: "",
            investmentAmount: "",
            startDate: "",
            duration: "",
            status: "IN_PROGRESS",   
          });
        })
        .catch(error => {
          setError(true)
          setTimeout(() => {
            setError(false);
          }, 5000);
          setInvestment({
            userId: user.id,
            type: "",
            investmentAmount: "",
            startDate: "",
            duration: "",
            status: "IN_PROGRESS",   
          });
          console.error("Error adding investment:", error);
          
        });
    };

    const handleClose = (event) => {
      event.preventDefault();
      setShowForm(false); 
      setInvestment({...investment,companyName:''});
    };

    const handleSelectChange = (e) => {
      const { value } = e.target;
      setInvestment({...investment, type: value === "Stock" ? "Stock" : "Bond" });
    };


    const fetchRecommendedCompanies= async()=>{
      const url='http://127.0.0.1:5000/recommend_companies'
      const body={ 
         investor_id: user.id,     
     }
     try{
       const response= await axios.post(url, body);
       console.log( "Recommended Companies", response.data );
       const sortedCompanies = response.data.recommended_companies.sort((a, b) => b.profit - a.profit);
       setCompanies(sortedCompanies) ;
       setIsLoading(false);
     }
     catch (error){
        console.error("Failed to fetch recommended companies",error)
     }
   }

   const fetchPredictedToleranceRisk= async()=>{
    const url='http://127.0.0.1:5004/predict_tolerance_risk'

    const body={    
     base_url: "http://localhost:8023/profileData/findProfile/",
     investor_id: user.id,   
   }
   try{
     console.log('rrr',user.id)
     const response= await axios.post(url, body);
     console.log( "PredictedToleranceRisk", response.data.predicted_tolerance_risk );
     setPredictedRisk(response.data.predicted_tolerance_risk) ;
   }
   catch (error){
      console.error("Failed to fetch Predicted Tolerance Risk",error)
   }
 }

 const fetchProfileData= async()=>{
   try
  { const response= await axios.get(`http://localhost:8023/profileData/findProfile/${user.id}`)
  setProfileData(response.data)
  console.log("profile Data",response.data)
}

  catch(error){
   console.log(error.response.data)
  }
}

  const analyseCompanyDataBasedOnProfileData = async (analyseCompany)=>{
  const url='http://localhost:5003/generate'


  const body={
    company_name: analyseCompany,
    investor_id: user.id
  }
  console.log('bodyAnaluuu',body)
  try{
  const result= await axios.post(url,body)
  setAnalyseResponse(result.data.response)
  console.log('analyseResponse',result.data.response)
  setAnalyseCompany("")
}
 catch(error){
     console.log("error when Exctracting the analyst message")
     setAnalyseCompany("")
  }
}  

  const handleShowProfileData=()=> {
     setShowProfileData(true);
     setTimeout(() => {
     setShowProfileData(false);
     }, 5000);
 } 

const handleShowGeminiAnalyseMessage =(companyName)=>{
  setAnalyseMessage(true);
  setAnalyseCompany(companyName)
  analyseCompanyDataBasedOnProfileData(companyName)
  setAnalyseCompany("")

}



    useEffect(() => {
      if (email) {
        fetchUserByEmail(email);
      }
    }, [email]);


    useEffect(()=>{
      if (user.id)
     { fetchRecommendedCompanies();
      fetchProfileData();
      fetchPredictedToleranceRisk();
 }
   } ,[user.id])



   const handleProgress=(value)=>{
    return value;
   }

   function parseTextFromAPI(text) {
    
    const withLineBreaks = text.replace(/##/g, '');
    const withBold = withLineBreaks.replace(/\*\* /g, " ").split("**"); 
    const filteredSentences = withBold.filter(sentence => !/^[\s*]*$/.test(sentence));
    const withoutAsterisks = filteredSentences.map(sentence => sentence.trim().replace(/\*$/, ''));
    const sentences = withoutAsterisks.map((sentence, index) => {
        return <p key={index}>{sentence}</p>;
    });

    return sentences;
}

  

  return (
 <DashboardLayout>
   <ComponentNavbar/>
  <div className="recommandationContainer">
  <h1> FEEDBACKS ANALYSE WITH AI MODELS </h1>
  <h5>Personalized AI-driven feedback analyse</h5>

 
  <div className="content" style={{backgroundColor:"transparent"}}>

     <Grid display="flex"  >
    <Card className='geminiMessage' style={{margintop:'3%'}} >
    <h5> Positive feedbacks analyse</h5>
      <Grid display="flex" gap="2%">
      <img src={logo} width="2%" height="5px"/>
      <h6 className="chatHeader">InvestAI Result</h6>
      </Grid>
    <p style={{color:'white'}}> <strong>Response:</strong> <br/>{parseTextFromAPI(analyseResponse)}</p>
   </Card>
   <Card className='geminiMessage' style={{margintop:'3%'}} >
   <h5> Negative feedbacks analyse</h5>
      <Grid display="flex" gap="2%">
      <img src={logo} width="2%" height="5px"/>
      <h6 className="chatHeader">InvestAI Result</h6>
      </Grid>
    <p style={{color:'white'}}> <strong>Response:</strong> <br/>{parseTextFromAPI(analyseResponse)}</p>
   </Card>
   </Grid>



   <Card className='geminiMessage' style={{marginTop:'5%'}} >
   <h5> Solutions for negative feedbacks</h5>
      <Grid display="flex" gap="2%">
      <img src={logo} width="2%" height="5px"/>
      <h6 className="chatHeader">InvestAI Result</h6>
      </Grid>
    <p style={{color:'white'}}> <strong>Response:</strong> <br/>{parseTextFromAPI(analyseResponse)}</p>
   </Card>
  </div>

 </div>
</DashboardLayout>
  )
}

export default CompaniesRecommandations