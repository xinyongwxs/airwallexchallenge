import React from "react";
import InvitationInfo from "./InvitationInfo";
import "./InvitingPad.less";

class InvitingPad extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHideInvitationInfo: true
		};
		this.showText = {
			slogan: "A better way to enjoy every day.",
			postScript: "Be the first to know when we launch.",
			inviteBtnText: "Request an invite"
		};
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	inviteBtnHandler() {
		let currState = Object.assign({}, this.state);
		currState.isHideInvitationInfo = false;
		this.setState(currState);
	}

	inviteSubmitHandler() {

	}

	closeInviteHandler() {
		let currState = Object.assign({}, this.state);
		currState.isHideInvitationInfo = true;
		this.setState(currState);
	}

	render() {
		return (<div className="inviting-pad">
				<InvitationInfo isHide={this.state.isHideInvitationInfo} 
				handleSubmit={this.inviteSubmitHandler.bind(this)}
				shadowClickHandler={this.closeInviteHandler.bind(this)}  />
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