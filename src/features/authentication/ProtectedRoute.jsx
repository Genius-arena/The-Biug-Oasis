import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedRoute;
