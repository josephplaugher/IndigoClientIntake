import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import ValRules from 'Util/ValRules'
import UserNotify from 'Util/UserNotify'

class EditEventTypeView extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/editEventType'
		this.valRules = ValRules
		this.extraData = { id: this.props.data.id }
		this.state = {
			userNotify: { error: '', message: '' },
			eventType: this.props.data.eventType,
			id: this.props.data.id,
			formData: {
				eventType: this.props.data.eventType,
				id: this.props.data.id
			}
		}
		this.response = this.response.bind(this)
	}

	response(resp) {
		this.setState({ userNotify: resp.data.userNotify })
		this.props.refreshOptions()
		//	this.props.close()
	}

	render() {
		return (
			<div id='edit-view'>
				<p className='form-title'>Edit Event Type | ID: {this.state.id}</p>
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
						<Button id='submit' value='Update' />
					</div>
				</form>
				<div className='rfa_button-div'>
					<Button id='delete-item' value='Delete' />
				</div>
				<div className='rfa_button-div'>
					<Button id='return' value='Back to List' onClick={this.props.close} />
				</div>
			</div>
		)
	}
}

export default EditEventTypeView
