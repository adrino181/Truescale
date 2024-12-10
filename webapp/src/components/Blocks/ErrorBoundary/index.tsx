import React from "react";
import { Snackbar } from "@mui/material";
import { connect } from "react-redux";
import { resetError } from "../../../redux/authSlice";

const logErrorToMyService = (...args) => console.log(...args);

type ErrorType = {
  hasError: boolean;
  errorMessage: string;
};
interface Props {
  children: React.ReactNode;
  authError: ErrorType;
  followError: ErrorType;
  postError: ErrorType;
  resetError: Function;
}

interface MyState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, MyState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }
  closeSnackBar() {
    const { resetError } = this.props;
    resetError();
  }

  render() {
    const { hasError } = this.state || {};
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return (
      <>
        {this.props.authError.hasError ? (
          <Snackbar
            open={this.props.authError.hasError}
            onClose={this.closeSnackBar}
            message={this.props.authError.errorMessage}
            autoHideDuration={3000}
          />
        ) : (
          <></>
        )}

        {this.props.children}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    authError: state.auth.error,
    followError: state.follow.error,
    postError: state.post.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //@ts-ignore
    resetError: () => dispatch(resetError()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
