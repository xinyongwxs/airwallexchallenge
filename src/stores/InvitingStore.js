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

	addInvitationChangeListener(callback) {
		this.addListener("invitationChange", callback);
	}

	removeInvitationChangeListener() {
		this.removeAllListener("invitationChange");
	}
}

let invitingStore = new InvitingStore();

invitingStore.dispatchToken = AppDispatcher.register((payload) => {
	switch(payload.type) {
		case ActionTypes.REQUEST_AN_INVITATION:
			invitingStore.requestAnInvitation(payload.data);
			break;
		default:
			break;
	}
	return true;
});

export default invitingStore;