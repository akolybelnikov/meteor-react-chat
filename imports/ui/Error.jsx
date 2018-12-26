import React from "react";
import Grid from "./SVG/grid";
import { withRouter } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  reload = () => {
    this.props.history.push("/");
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid">
          <h2 className="subtitle has-text-info">Something went wrong</h2>
          <Grid fill="#00d1b2" />
          <button onClick={this.reload} className="button is-success">
            Go back to safety
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
