import { forwardRef } from "react";
import PropTypes from "prop-types";
import MDTypography from "components/MDTypography";
import MDProgressRoot from "components/MDProgress/MDProgressRoot";

const MDProgress = forwardRef(({ variant, color, value, label, ...rest }, ref) => (
  <>
    {label && (
      <MDTypography variant="button" fontWeight="medium" style={{color:"rgba(9, 9, 9, 0.805)" ,fontFamily:':Cambria, Cochin, Georgia, Times,Times New Roman, serif'}}>
       <span >Investor Risk Rate</span> {value}% 
      </MDTypography>
    ) }
    <MDProgressRoot
      {...rest}
      ref={ref}
      variant="determinate"
      value={value}
      ownerState={{ color, value, variant }}
    />
  </>
));

MDProgress.defaultProps = {
  variant: "contained",
  color: "warning",
  value: 0,
  label: false,
};

MDProgress.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  value: PropTypes.number,
  label: PropTypes.bool,
};

export default MDProgress;
