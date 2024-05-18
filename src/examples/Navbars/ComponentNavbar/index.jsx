import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import breakpoints from "assets/theme/base/breakpoints";
import { useMaterialUIController } from "context";
import ComponentNavbarLink from "./ComponentNavbarLink";
import ComponentNavbarMobile from "./ComponentNavbarMobile";

function ComponentNavbar({ transparent, light, action }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the ComponentNavbarLink.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }
    displayMobileNavbar();
  }, []);

  return (
    <Container>
      <MDBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={3}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={ "white"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(darkMode ? background.sidenav : white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <MDBox
          component={Link}
          to="/"
          py={transparent ? 1.5 : 0.75}
          lineHeight={1}
          pl={{ xs: 0, lg: 1 }}
        >
          <MDTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
            InvestAI
          </MDTypography>
        </MDBox>
        <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <ComponentNavbarLink icon="donut_large" name="dashboard" route="/dashboard" light={light} />
          <ComponentNavbarLink icon="person" name="profile" route="/profile" light={light} />
          <ComponentNavbarLink
            icon="key"
            name="logout"
            route="/authentication/sign-in"
            light={light}
          />
        </MDBox>
        {action &&
          (action.type === "internal" ? (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              <MDButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
              >
                {action.label}
              </MDButton>
            </MDBox>
          ) : (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              <MDButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                sx={{ mt: -0.3 }}
              >
                {action.label}
              </MDButton>
            </MDBox>
          ))}
        <MDBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </MDBox>
      </MDBox>
      {mobileView && <ComponentNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

ComponentNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

ComponentNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.node.isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.node.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ]),
};
export default ComponentNavbar;
