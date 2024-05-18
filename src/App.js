import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";
import { useMaterialUIController, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { useSelector } from "react-redux";
import SignIn from "layouts/authentication/sign-in";
import PropTypes from 'prop-types';

function PrivateRoute({ element, isAuthenticated ,isPrivate}) {
  return (isAuthenticated && isPrivate) ? element : <Navigate to="/authentication/sign-in" />;
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.value.isAuthenticated);
  const [controller, dispatch] = useMaterialUIController();
  const {
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  const configsButton = (
 
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Admin Dashboard"
            routes={routes}          
          />        
      )}
    
      <Routes>
  <Route path="/" element={<Navigate to="/authentication/sign-in" />} />
  <Route path="/authentication/sign-in" element={<SignIn/>} />
  {routes.map((route) => (
    <Route exact path={route.route} key={route.key} 
      element={
        <PrivateRoute
          element={route.component}
          isAuthenticated={isAuthenticated}
          isPrivate={route.isPrivate}
        />
      }
    />
  ))}
</Routes>
    </ThemeProvider>
  );
}

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
};

export default App;