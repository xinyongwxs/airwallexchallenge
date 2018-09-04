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
			<span className="finished-info-content">{this.props.infoContent}</span>
			<div className="finished-button" onClick={this.props.btnClickHandler}>OK</div>
			</div>);
		return (<Popup shadowClickHandler={this.props.shadowClickHandler}
						content={content}
						isHide={this.props.isHide} />);
	}
}

export default FinishedInfo;