
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ComponentNavbarLink({ icon, name, route, light }) {
  return (
    <MDBox
      component={Link}
      to={route}
      mx={1}
      p={1}
      display="flex"
      alignItems="center"
      sx={{ cursor: "pointer", userSelect: "none" }}
    >
      <Icon
        sx={{
          color: ({ palette: { white, secondary } }) => (light ? white.main : secondary.main),
          verticalAlign: "middle",
        }}
      >
        {icon}
      </Icon>
      <MDTypography
        variant="button"
        fontWeight="regular"
        color={light ? "white" : "dark"}
        textTransform="capitalize"
        sx={{ width: "100%", lineHeight: 0 }}
      >
        &nbsp;{name}
      </MDTypography>
    </MDBox>
  );
}

// Typechecking props for the DefaultNavbarLink
ComponentNavbarLink.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  route: PropTypes.string,
  light: PropTypes.bool,
};

export default ComponentNavbarLink;
