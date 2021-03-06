import React from "react";
import InvitationInfo from "./InvitationInfo";
import FinishedInfo from "./FinishedInfo";
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
				fullName: "",
				email: "",
				emailAgain: "",
				errorMessage: null,
				isEmailConflict: false,
				errorType:null
			},
			isHideFinishedInfo: true,
			finishedInfo: {
				finishedInfoContent: null
			},
			isEjected: false,
			busy: false
		};
		this.showText = {
			slogan: "A better way to enjoy every day.",
			postScript: "Be the first to know when we launch.",
			inviteBtnText: "Request an invite"
		};
		this.padBodyRef = null;
	}

	componentWillMount() {
		InvitingStore.addInvitationChangeListener(this.handleAfterInvitation.bind(this));
		InvitingStore.addRejectInvitationChangeListener(this.handleRejectedInvitation.bind(this));
	}

	componentDidMount() {
		window.addEventListener("resize", () => {
			this.calculateCurrentBodyHeight();
		});

		this.calculateCurrentBodyHeight();
	}

	calculateCurrentBodyHeight() {
		let windowInnerHeight = window.innerHeight;
		let padBodyHeight = windowInnerHeight - 120;
		let padBodyRef = this.padBodyRef;
		if (padBodyRef !== null) {
			padBodyRef.style.height = padBodyHeight + "px";
		}
	}

	componentWillUnmount() {
		InvitingStore.removeRejectInvitationChangeListener();
		InvitingStore.removeInvitationChangeListener();
	}

	handleRejectedInvitation(data) {
		let currState = Object.assign({}, this.state);
		currState.busy = false;
		currState.isHideInvitationInfo = true;
		currState.isHideFinishedInfo = false;
		currState.isEjected = true;
		if (data.entity != null) {
			let finishedInfo = Object.assign({}, this.state.finishedInfo);
			finishedInfo.finishedInfoContent = data.entity.errorMessage;
			currState.finishedInfo = finishedInfo;
		}
		this.setState(currState);
	}

	ejectedOkHandler() {
		let currState = Object.assign({}, this.state);
		currState.isHideFinishedInfo = true;
		currState.isHideInvitationInfo = false;
		this.setState(currState);
	}

	handleAfterInvitation(data) {
		let currState = Object.assign({}, this.state);
		currState.busy = false;
		currState.isHideInvitationInfo = true;
		currState.isHideFinishedInfo = false;
		currState.isEjected = false;
		let finishedInfo = Object.assign({}, this.state.finishedInfo);
		finishedInfo.finishedInfoContent = "You will be one of first to experience Broccoli & Co. when we launch.";
		currState.finishedInfo = finishedInfo;

		let invitationInfo = {
			fullName: "",
			email: "",
			emailAgain: "",
			errorMessage: null,
			isEmailConflict: false
		};
		currState.invitationInfo = invitationInfo;
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

	updateInvitationErrorMsg(msg, errorType) {
		let currState = Object.assign({}, this.state);
		let invitationInfo = Object.assign({}, currState.invitationInfo);
		invitationInfo.errorMessage = msg;
		invitationInfo.errorType = errorType;
		currState.invitationInfo = invitationInfo;
		this.setState(currState);
	}

	updateIsEmailConflictStatus(status) {
		let currState = Object.assign({}, this.state);
		let invitationInfo = Object.assign({}, currState.invitationInfo);
		invitationInfo.isEmailConflict = status;
		if (status) {
			invitationInfo.errorMessage = "Email confirmation must be same with email.";
		}
		currState.invitationInfo = invitationInfo;
		this.setState(currState);
	}

	validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	inviteSubmitHandler(event) {
		event.preventDefault();
		let info = this.state.invitationInfo;

		if (!info.fullName) {
			this.updateInvitationErrorMsg("Full name cannot be null.", "fullName");
			return;
		}

		if (!info.email) {
			this.updateInvitationErrorMsg("Email cannot be null.", "email");
			return;
		}

		if (!this.validateEmail(info.email)) {
			this.updateInvitationErrorMsg("Invalid email format.", "email");
			return;
		}

		if (!info.emailAgain) {
			this.updateInvitationErrorMsg("Email confirmation cannot be null.", "emailAgain");
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

	finishedClickHandler() {
		let currState = Object.assign({}, this.state);
		currState.isHideFinishedInfo = true;
		this.setState(currState);
	}

	render() {
		let info = Object.assign({}, this.state.invitationInfo);
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
				errorType={this.state.invitationInfo.errorType}
				isEmailConflict={this.state.invitationInfo.isEmailConflict} />
				<FinishedInfo isHide={this.state.isHideFinishedInfo}
								infoContent={this.state.finishedInfo.finishedInfoContent}
								btnClickHandler={this.state.isEjected ? 
									this.ejectedOkHandler.bind(this) : this.finishedClickHandler.bind(this)} />
				<div className="pad-header"><span className="header-title">BROCCOLI & CO.</span></div>
				<div className="pad-body" ref={(ref) => {
					this.padBodyRef = ref;
				}}>
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
				<div className="pad-footer">
					<span className="footer-title">Made with ♥ in Melbourne.</span>
					<span className="footer-script">© 2016 Broccoli & Co. All rights reserved.</span>
				</div>
			</div>);
	}
}

export default InvitingPad;