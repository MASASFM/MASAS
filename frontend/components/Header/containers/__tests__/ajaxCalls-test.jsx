'use strict';

jest.unmock('../ajaxCalls.jsx')


describe('fetch current user', () => {
	it('calls into $.ajax with the correct params', () => {
		const $ = require('jquery')
		const { getUsername } = require('../ajaxCalls.jsx')

		// Call into the function we want to test
		const dummyCallback = () => {}
		const userToken = "4N2zd3Osw3Fo7togfYoFPXtHlt9jGD"

		getUsername(dummyCallback, userToken, dummyCallback)

		// Now make sure that $.ajax was properly called during the previous
		// 2 lines
		expect($.ajax).toBeCalledWith({
			type: 'GET',
			url: 'api/check-user/',
			headers: {
				"Authorization": "Bearer " + userToken,
			},
			success: jasmine.any(Function),
			error: jasmine.any(Function),
		})
	})

	pit('works with async/await', async () => {
		jest.mock('../ajaxCalls.jsx')
		const { getUsername } = require('../ajaxCalls.jsx')
		const dummyCallback = () => {}

		const userName = await getUsername("4N2zd3Osw3Fo7togfYoFPXtHlt9jGD")
		expect(userName).toEqual({userPk: "4", user: "thomas", auth: "4N2zd3Osw3Fo7togfYoFPXtHlt9jGD"})
	})

	it('calls the callback when $.ajax requests are finished', () => {
		jest.unmock('../ajaxCalls.jsx')
		const $ = require('jquery')
		const { getUsername } = require('../ajaxCalls.jsx')

		let callback = jest.fn()
		const userToken = "4N2zd3Osw3Fo7togfYoFPXtHlt9jGD"
		getUsername(callback, userToken, callback)

		$.ajax.mock.calls[0/*first call*/][0/*first argument*/].success({
			userPk: "4", user: "thomas", auth: "4N2zd3Osw3Fo7togfYoFPXtHlt9jGD"
		})

		expect(callback.mock.calls[0/*first call*/][0/*first argument*/]).toEqual({
			type:'SET_USERNAME', 
			username: 'thomas'
		})
	})
})