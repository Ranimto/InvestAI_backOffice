
import PropTypes from "prop-types";
import MDBox from "components/MDBox";

function DataTableBodyCell({ noBorder, align, children }) {
  return (
    <MDBox
      component="td"
      textAlign={align}
      py={0.35}
      px={2}
      sx={({ palette: { light }, borders: { borderWidth } }) => ({
        fontSize: "11px",
        fontWeight:"100",
        borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <MDBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: "middle" }}
      >
        {children}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
};

// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableBodyCell;
