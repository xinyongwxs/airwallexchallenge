import React from "react";
import Popup from "./Popup";

class InvitationInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		const content = (<form className="info-list" onSubmit={this.props.handleSubmit}>
			<input type="text" className={this.props.errorType === "fullName" ? 
			"error-input" : "correct-input"} name="fullName" placeholder="Full Name" onChange={this.props.userNameChangeHandler} value={this.props.fullName} />
			<input type="text" className={(this.props.isEmailConflict || this.props.errorType === "email") ? 
			"error-input" : "correct-input"} name="email" placeholder="Email" onChange={this.props.emailChangeHandler} value={this.props.email} />
			<input type="text" className={(this.props.isEmailConflict || this.props.errorType === "emailAgain") ? 
			"error-input" : "correct-input"} name="emailAgain" placeholder="Confirm Email" onChange={this.props.emailAgainChangeHandler} value={this.props.emailAgain} />
			<input type="submit" value="Login" />
			<span className="error-message">{this.props.errorMessage}</span>
		</form>);
		return (<Popup shadowClickHandler={this.props.shadowClickHandler}
						content={content}
						isHide={this.props.isHide} />);
	}
}

export default InvitationInfo;