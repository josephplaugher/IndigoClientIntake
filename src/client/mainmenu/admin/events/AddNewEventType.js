import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import ValRules from 'Util/ValRules'
import UserNotify from 'Util/UserNotify'

class AddNewEventType extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/addNewEventType'
		this.valRules = ValRules
		this.state = {
			userNotify: { error: '', message: '' },
			eventType: this.props.data.eventType,
			formData: {
				eventType: this.props.data.eventType
			}
		}
		this.response = this.response.bind(this)
	}

	response(resp) {
		this.setState({ userNotify: resp.data.userNotify })
		if (resp.data.userNotify.success) {
			this.props.refreshOptions()
		}
	}

	render() {
		return (
			<div id='edit-view'>
				<p className='form-title'>Add New Item</p>
				{/* prettier-ignore */}
				{/* <UserNotify userNotify={this.state.userNotify} /> */}
				<form onSubmit={this.rfa_onSubmit}>
					<Input
						name='eventType'
						label='Event Type'
						value={this.state.eventType}
						onChange={this.rfa_onChange}
					/>
					<div className='rfa_button-div'>
						<Button id='submit' value='Save' />
					</div>
				</form>
				<div className='rfa_button-div'>
					<Button
						id='return-to-table'
						value='Back to List'
						onClick={this.props.close}
					/>
				</div>
				<br />
			</div>
		)
	}
}

export default AddNewEventType
