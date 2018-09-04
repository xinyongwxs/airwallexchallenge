import React from "react";
import Popup from "./Popup";

class FinishedInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		const content = (<div className="finished-info">
			<span className="finished-info-content"></span>
			<div className="finished-button"></div>
			</div>);
		return (<Popup shadowClickHandler={this.props.shadowClickHandler}
						content={content}
						isHide={this.props.isHide} />);
	}
}

export default FinishedInfo;