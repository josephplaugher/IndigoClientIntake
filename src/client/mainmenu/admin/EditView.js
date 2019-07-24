import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import ValRules from 'Util/ValRules'
import UserNotify from 'Util/UserNotify'

class EditView extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/editItem'
		this.valRules = ValRules
		this.extraData = { id: this.props.data.id }
		this.state = {
			userNotify: { error: '', message: '' },
			item: this.props.data.item,
			price: this.props.data.price,
			category: this.props.data.category,
			id: this.props.data.id,
			formData: {
				item: this.props.data.item,
				price: this.props.data.price,
				category: this.props.data.category,
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
				<p className='form-title'>Edit Item | ID: {this.state.id}</p>
				{/* prettier-ignore */}
				{/* <UserNotify userNotify={this.state.userNotify} /> */}
				<form onSubmit={this.rfa_onSubmit}>
					<Input
						name='item'
						label='Item Name'
						value={this.state.item}
						onChange={this.rfa_onChange}
					/>
					<Input
						name='price'
						label='Price'
						value={this.state.price}
						onChange={this.rfa_onChange}
					/>
					<Input
						name='category'
						label='Category'
						value={this.state.category}
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
					<Button id='return' value='Back to List' />
				</div>
			</div>
		)
	}
}

export default EditView
