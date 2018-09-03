import React from "react";
import InvitationInfo from "./InvitationInfo";
import "./InvitingPad.less";
import InvitingStore from "../stores/InvitingStore";
import InvitingActionCreator from "../actions/InvitingActionCreator";
import BusyIndicator from "./BusyIndicator";

class InvitingPad extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHideInvitationInfo: true,
			invitationInfo: {
				fullName: null,
				email: null,
				emailAgain: null,
				errorMessage: null,
				isEmailConflict: false
			},
			busy: false
		};
		this.showText = {
			slogan: "A better way to enjoy every day.",
			postScript: "Be the first to know when we launch.",
			inviteBtnText: "Request an invite"
		};
	}

	componentWillMount() {
		InvitingStore.addInvitationChangeListener(this.handleAfterInvitation.bind(this));
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	handleAfterInvitation() {
		let currState = Object.assign({}, this.state);
		currState.busy = false;
		currState.isHideInvitationInfo = true;
		this.setState(currState);
	}

	userNameChangeHandler(param) {
		let value = param.target.value;
		let currState = Object.assign({}, this.state);
		let invitationInfo = Object.assign({}, currState.invitationInfo);
		invitationInfo.fullName = value;
		currState.invitationInfo = invitationInfo;
		this.setState(currState);
	}

	emailChangeHandler(param) {
		let value = param.target.value;
		let currState = Object.assign({}, this.state);
		let invitationInfo = Object.assign({}, currState.invitationInfo);
		invitationInfo.email = value;
		currState.invitationInfo = invitationInfo;
		this.setState(currState);
	}

	emailAgainChangeHandler(param) {
		let value = param.target.value;
		let currState = Object.assign({}, this.state);
		let invitationInfo = Object.assign({}, currState.invitationInfo);
		invitationInfo.emailAgain = value;
		currState.invitationInfo = invitationInfo;
		this.setState(currState);
	}



	inviteBtnHandler() {
		let currState = Object.assign({}, this.state);
		currState.isHideInvitationInfo = false;
		this.setState(currState);
	}

	updateInvitationErrorMsg(msg) {
		let currState = Object.assign({}, this.state);
		let invitationInfo = Object.assign({}, currState.invitationInfo);
		invitationInfo.errorMessage = msg;
		currState.invitationInfo = invitationInfo;
		this.setState(currState);
	}

	updateIsEmailConflictStatus(status) {
		let currState = Object.assign({}, this.state);
		let invitationInfo = Object.assign({}, currState.invitationInfo);
		invitationInfo.isEmailConflict = status;
		currState.invitationInfo = invitationInfo;
		this.setState(currState);
	}

	inviteSubmitHandler(event) {
		event.preventDefault();
		let info = this.state.invitationInfo;

		if (!info.fullName) {
			this.updateInvitationErrorMsg("User name cannot be null.");
			return;
		}

		if (!info.email) {
			this.updateInvitationErrorMsg("Email cannot be null.");
			return;
		}

		if (!info.emailAgain) {
			this.updateInvitationErrorMsg("Email confirmation cannot be null.");
			return;
		}

		if (info.email === info.emailAgain) {
			let currState = Object.assign({}, this.state);
			currState.busy = true;
			let invitationInfo = {
				fullName: currState.invitationInfo.fullName,
				email: currState.invitationInfo.email,
				emailAgain: currState.invitationInfo.emailAgain,
				errorMessage: null,
				isEmailConflict: false
			};
			currState.invitationInfo = invitationInfo;
			this.setState(currState);
			let postInfo = {
				name: info.fullName,
				email: info.email
			};
			InvitingActionCreator.requestAnInvitation(postInfo);
		} else {
			this.updateIsEmailConflictStatus(true);
		}
		
	}

	closeInviteHandler() {
		let currState = Object.assign({}, this.state);
		currState.isHideInvitationInfo = true;
		this.setState(currState);
	}

	render() {
		let info = this.state.invitationInfo;
		return (<div className="inviting-pad">
				{this.state.busy ? <BusyIndicator /> : null}
				<InvitationInfo isHide={this.state.isHideInvitationInfo} 
				handleSubmit={this.inviteSubmitHandler.bind(this)}
				shadowClickHandler={this.closeInviteHandler.bind(this)}
				fullName={info.fullName}
				email={info.email}
				emailAgain={info.emailAgain}
				userNameChangeHandler={this.userNameChangeHandler.bind(this)}
				emailChangeHandler={this.emailChangeHandler.bind(this)}
				emailAgainChangeHandler={this.emailAgainChangeHandler.bind(this)}
				errorMessage={this.state.invitationInfo.errorMessage}
				isEmailConflict={this.state.invitationInfo.isEmailConflict} />
				<div className="pad-header"></div>
				<div className="pad-body">
					<div className="center-content">
							<div className="slogan">{this.showText.slogan}</div>
							<div className="post-script">{this.showText.postScript}</div>
							<div className="trigger-invitation">
								<div className="invite-btn" onClick={this.inviteBtnHandler.bind(this)}>
							{this.showText.inviteBtnText}
								</div>
							</div>
					</div>
				</div>
				<div className="pad-footer"></div>
			</div>);
	}
}

export default InvitingPad;