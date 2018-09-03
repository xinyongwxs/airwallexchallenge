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
			<input type="text" className="full-name-input" name="fullName" placeholder="Full Name" onChange={this.props.userNameChangeHandler} value={this.props.fullName}/>
			<input type="text" className="email-input" name="email" placeholder="Email" onChange={this.props.emailChangeHandler} value={this.props.email} />
			<input type="text" className="email-input" name="emailAgain" placeholder="Confirm Email" onChange={this.props.emailAgainChangeHandler} value={this.props.emailAgain} />
			<input type="submit" value="Login" />
		</form>);
		return (<Popup shadowClickHandler={this.props.shadowClickHandler}
						content={content}
						isHide={this.props.isHide} />);
	}
}

export default InvitationInfo;