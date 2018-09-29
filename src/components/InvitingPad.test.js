import React from "react";
import InvitingPad from "./InvitingPad";

describe("InvitingPad test", () => {
	beforeAll(() => {
		global.wrapper = shallow(<InvitingPad />);
	});

	afterAll(() => {
		global.wrapper = null;
	});

	it ("InvitingPad mount",() => {
		expect(wrapper.find(".center-content").length).toEqual(1);
	});

	it ("InvitingPad popup InvitingInfo", () => {
		wrapper.instance().inviteBtnHandler();
		setTimeout(() => {
			wrapper.update();
			expect(wrapper.find(".modal").length).toEqual(1);
			expect(wrapper.find(".info-list").length).toEqual(1);
			let currState = Object.assign({}, wrapper.instance().state);
			let invitationInfo = Object.assign({}, currState.invitationInfo);
			invitationInfo.fullName = "";
			invitationInfo.email = "hello@sa.com";
			invitationInfo.emailAgain = "hello@sa.com";
			currState.invitationInfo = invitationInfo;
			wrapper.instance().setState(currState, () => {
				wrapper.update();
				wrapper.instance().inviteSubmitHandler({
					preventDefault: () => {}
				});
				setTimeout(() => {
					wrapper.update();
					expect(wrapper.find(".error-input").length).toEqual(1);
					invitationInfo.fullName = "aaa";
					invitationInfo.email = "hello@sb.com";
					invitationInfo.emailAgain = "hello@sa.com";
					currState.invitationInfo = invitationInfo;
					wrapper.instance().setState(currState, () => {
						wrapper.update();
						expect(wrapper.find(".error-input").length).toEqual(2);
					});
				}, 300);
			});
		}, 300);
	});

	it ("Handler which will be called after invited successfully", () => {
		wrapper.instance().handleAfterInvitation({});
		setTimeout(() => {
			wrapper.update();
			expect(wrapper.contains("You will be one of first to experience Broccoli")).toEqual(true);
		}, 500);
	});

	it ("Handler which will be called after invited failed", () => {
		wrapper.instance().handleRejectedInvitation({
			entity: {
				errorMessage: "error!"
			}
		});
		setTimeout(() => {
			wrapper.update();
			expect(wrapper.contains("error!")).toEqual(true);
		}, 500);
	});
});