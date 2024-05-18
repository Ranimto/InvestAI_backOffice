import Icon from "@mui/material/Icon";
import PropTypes from 'prop-types';
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";

function DataTableHeadCell({ width, children, sorted, align, ...rest }) {
  const [controller] = useMaterialUIController();
  

  return (
    <MDBox
      component="th"
      width={width}
      py={0.1}
      px={2}
      sx={({ palette: { light }, borders: { borderWidth } }) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <MDBox
        {...rest}
        position="relative"
        textAlign={align}
        color= "secondary"
        opacity={1} 
        sx={({ typography: { size} }) => ({
          fontSize: size.xs,
          fontWeight: 600,
          textTransform: "uppercase",
          cursor: sorted && "pointer",
          userSelect: sorted && "none",
        })}
      >
        {children}
        {sorted && (
          <MDBox
            position="absolute"
            top={0}
            right={align !== "right" ? "10px" : 0}
            left={align === "right" ? "-5px" : "unset"}
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            <MDBox
              position="absolute"
              top={-6}
              color= "text" 
              opacity= {1}
            >
              <Icon>arrow_drop_up</Icon>
            </MDBox>
            <MDBox
              position="absolute"
              top={0}
              color="text" 
              opacity={0.2}
            >
              <Icon>arrow_drop_down</Icon>
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of DataTableHeadCell
DataTableHeadCell.defaultProps = {
  width: "auto",
  sorted: "none",
  align: "left",
};

// Typechecking props for the DataTableHeadCell
DataTableHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  sorted: PropTypes.oneOf([false, "none", "asce", "desc"]),
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableHeadCell;