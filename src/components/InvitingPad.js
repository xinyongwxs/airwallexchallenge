import React from "react";
import InvitationInfo from "./InvitationInfo";
import "./InvitingPad.less";
import InvitingStore from "../stores/InvitingStore";
import InvitingActionCreator from "../actions/InvitingActionCreator";

class InvitingPad extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHideInvitationInfo: true,
			invitationInfo: {
				fullName: null,
				email: null,
				emailAgain: null
			}
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

	}

	inviteBtnHandler() {
		let currState = Object.assign({}, this.state);
		currState.isHideInvitationInfo = false;
		this.setState(currState);
	}

	inviteSubmitHandler(event) {
		event.preventDefault();
		let info = this.state.invitationInfo;

		if (!info.fullName && !info.email && !info.emailAgain) {
			let postInfo = {
				name: info.fullName,
				email: info.email
			};
			InvitingActionCreator.requestAnInvitation(postInfo).then(() => {
				this.closeInviteHandler();
			});
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
				<InvitationInfo isHide={this.state.isHideInvitationInfo} 
				handleSubmit={this.inviteSubmitHandler.bind(this)}
				shadowClickHandler={this.closeInviteHandler.bind(this)}
				fullName={info.fullName}
				email={info.email}
				emailAgain={info.emailAgain} />
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