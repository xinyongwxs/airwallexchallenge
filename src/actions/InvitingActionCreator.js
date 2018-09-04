import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";
import InvitingService from "../services/InvitingService";

const ActionTypes = AppConstants.ActionTypes;

export default {
	requestAnInvitation(invitationInfo) {
		return InvitingService.postInvitationInfo(invitationInfo).then((data) => {
			AppDispatcher.dispatch({
				type: ActionTypes.REQUEST_AN_INVITATION,
				data: data
			});
		}, (data) => {
			AppDispatcher.dispatch({
				type: ActionTypes.REJECT_AN_INVITATION,
				data: data
			});
		});
	}
}