import client from './client';

const wrappedClient = (...params) => {
	return client(...params).then((response) => {
		return response
	}, (error) => {
		if (error && error.entity && error.entity.message) {
			console.log(error.entity.message);
		}
		throw error;
	});
}

export default {
	postInvitationInfo(invitationInfo) {
		let path = "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";
		let promise = wrappedClient({
			method: "POST",
			path: path,
			entity: invitationInfo,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return promise;
	}
}