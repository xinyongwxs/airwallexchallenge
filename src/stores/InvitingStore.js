import {EventEmitter} from "fbemitter";
import AppConstants from "../constants/AppConstants";
import AppDispatcher from "../dispatcher/AppDispatcher";

const ActionTypes = AppConstants.ActionTypes;

class InvitingStore extends EventEmitter {
	constructor() {
		super();
	}

	requestAnInvitation(param) {
		this.emit("invitationChange", param);
	}

	rejectAnInvitation(param) {
		this.emit("rejectInvitationChange", param);
	}

	addInvitationChangeListener(callback) {
		this.addListener("invitationChange", callback);
	}

	addRejectInvitationChangeListener(callback) {
		this.addListener("rejectInvitationChange", callback);
	}

	removeInvitationChangeListener() {
		this.removeAllListener("invitationChange");
	}

	removeRejectInvitationChangeListener() {
		this.removeAllListener("rejectInvitationChange");
	}
}

let invitingStore = new InvitingStore();

invitingStore.dispatchToken = AppDispatcher.register((payload) => {
	switch(payload.type) {
		case ActionTypes.REQUEST_AN_INVITATION:
			invitingStore.requestAnInvitation(payload.data);
			break;
		case ActionTypes.REJECT_AN_INVITATION:
			invitingStore.rejectAnInvitation(payload.data);
			break;
		default:
			break;
	}
	return true;
});

export default invitingStore;