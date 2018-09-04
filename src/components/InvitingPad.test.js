import React from "react";
import InvitingPad from "./InvitingPad";

describe("InvitingPad test", () => {
	beforeAll(() => {
		// global.window = {
		// 	addEventListener: () => {}
		// };
		global.wrapper = shallow(<InvitingPad />);
	});

	afterAll(() => {
		global.wrapper = null;
		// global.window = null;
	});

	it ("InvitingPad mount",() => {
		expect(wrapper.find(".center-content").length).toEqual(1);
	});

	it ("InvitingPad popup InvitingInfo", () => {
		wrapper.instance().inviteBtnHandler();
		wrapper.update();
		expect(wrapper.find(".info-list").length).toEqual(1);
	});
});