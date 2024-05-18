
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import pattern from "assets/images/illustrations/pattern-tree.svg";
import { Grid } from "@mui/material";

function CompanyCard({ color,name,image,amount,changeAmount}) {


  return (
    <Card
      sx={({ palette: { gradients }, functions: { linearGradient }, boxShadows: { xl } }) => ({
        background: gradients[color]
          ? linearGradient(gradients[color].main, gradients[color].state)
          : linearGradient(gradients.dark.main, gradients.dark.state),
        boxShadow: xl,
        position: "relative",
        width:"40%",
        height:"8rem"
      })}
    >
      <MDBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        opacity={0.2}
        sx={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
        }}
      />
      <MDBox position="relative" zIndex={2} p={2}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox display="flex" alignItems="center">
            <MDBox mr={3} lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={1}>
              {name} 
              </MDTypography>            
            </MDBox>
          
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" width="20%">
            { image ? 
            <MDBox component="img" src={image} alt="company card" width="100%" mt={1}/> :
            <></> 
          }     
          </MDBox>  
        </MDBox>
        <MDBox display="flex"  flexDirection="column" style={{margin:"30% 0 0 0" }}> 
        { (amount && changeAmount) &&
        <>         
            <p style={{color:"white" ,fontWeight:"400"}}> $ {amount}</p>
            <p style={{color:"white"}}>{changeAmount} %</p>
        </> 
}
        </MDBox>
      </MDBox>
    </Card>
  );
}


CompanyCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  name:PropTypes.string,
  image:PropTypes.string,
  amount:PropTypes.double,
  changeAmount:PropTypes.double
};

export default CompanyCard;
