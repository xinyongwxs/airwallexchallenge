import React from "react";
import "./BusyIndicator.less";

class BusyIndicator extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return ( 
      <div className = "app-loader" >
          <div className = "app-loader-mask" ></div> 
          <div className = "app-loader-spinner" ></div>
      </div>
    );
  }
};

export default BusyIndicator;