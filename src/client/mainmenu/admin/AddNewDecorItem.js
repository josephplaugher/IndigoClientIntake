import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import ValRules from 'Util/ValRules'
import UserNotify from 'Util/UserNotify'

import 'css/livesearch.scss'

class AddNewDecorItem extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = true
		this.lsa = ['category']
		this.lsRoute = '/liveSearch'
		this.route = '/addNewDecorItem'
		this.valRules = ValRules
		this.state = {
			userNotify: { error: '', message: '' },
			item: '',
			price: '',
			category: '',
			image: '',
			formData: {
				item: '',
				price: '',
				category: ''
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
						lsr={this.state.lsrcategory}
					/>
					<Input
						name='image'
						label='Image URL'
						value={this.state.image}
						onChange={this.rfa_onChange}
					/>
					<div className='rfa_button-div'>
						<Button id='submit' value='Save' />
					</div>
				</form>
				<div className='rfa_button-div'>
					<Button
						id='return-to-table'
						value='Back to Options'
						onClick={this.props.close}
					/>
				</div>
				<br />
			</div>
		)
	}
}

export default AddNewDecorItem
