
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MDBox from "components/MDBox";
import ComponentNavbarLink from "./ComponentNavbarLink";


function ComponentNavbarMobile({ open, close }) {
  const { width } = open && open.getBoundingClientRect();

  return (
    <Menu
    getcontentanchorel={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <MDBox px={0.5}>
        <ComponentNavbarLink icon="donut_large" name="dashboard" route="/dashboard" />
        <ComponentNavbarLink icon="person" name="profile" route="/profile" />
        <ComponentNavbarLink icon="key" name="logout" route="/authentication/sign-in" />
      </MDBox>
    </Menu>
  );
}

ComponentNavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
};

export default ComponentNavbarMobile;
