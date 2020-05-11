import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux' 

const AdminPrivateRoute = ({ auth, children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.adminMode ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(
mapStateToProps
)(AdminPrivateRoute);