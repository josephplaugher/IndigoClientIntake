import React from 'react'
import { FormClass, Input, Select, Button } from 'reactform-appco'
import ValRules from 'Util/ValRules'
import UserNotify from 'Util/UserNotify'
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'

class BuildQuote extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/buildQuote'
		this.valRules = ValRules
		this.state = {
			display: [],
			total: 0,
			userNotify: { error: '', message: '' },
			fname: '',
			lname: '',
			email: '',
			eventType: '',
			selections: [],
			formData: {
				fname: '',
				lname: '',
				email: '',
				eventType: ''
			}
		}
		this.handleChange = this.handleChange.bind(this)
		this.updateList = this.updateList.bind(this)
		this.getDecorList = this.getDecorList.bind(this)
		this.saveForLater = this.saveForLater.bind(this)
		this.setSendNow = this.setSendNow.bind(this)
		this.response = this.response.bind(this)
	}

	componentDidMount() {
		this.getDecorList()
	}

	getDecorList() {
		Ajax.get(SetUrl() + '/getDecorList')
			.catch((error) => {
				reject('error geting decor list: ', error)
			})
			.then((resp) => {
				console.log('get decor list', resp)
				this.updateList(resp.data.list)
			})
	}

	updateList(list) {
		let display = list.map((item) => (
			<div className='item-row' key={`${item.item}-div`}>
				<p key={`${item.id}-p`} className='item-p'>
					{item.item}
				</p>
				<p key={`${item.category}-p`} className='item-p'>
					{` | ${item.category}`}
				</p>
				<input
					type='checkbox'
					className='item-check'
					name={item.item}
					id={JSON.stringify(item)}
					value={this.state.item}
					onChange={this.handleChange}
				/>
				<p key={`${item.price}-p`} className='price-p'>
					${item.price}
				</p>
			</div>
		))
		this.setState({ display: display })
	}

	handleChange(event) {
		const target = event.target
		const itemData = JSON.parse(target.id)
		const checkedState =
			target.type === 'checkbox' ? target.checked : target.value
		const name = target.name

		var newSelections = this.state.selections
		let total = parseFloat(this.state.total)
		if (checkedState) {
			total = parseFloat(total) + parseFloat(itemData.price)
			newSelections.push(itemData.id)
		} else {
			total = parseFloat(total) - parseFloat(itemData.price)
			let toBeRemoved = newSelections.indexOf(itemData.id) //find the index of the array member to remove
			newSelections.splice(toBeRemoved, 1) //remove that array member
		}
		this.setState({
			[name]: itemData.value,
			total: parseFloat(total),
			selections: newSelections
		})
		this.extraData = { selections: newSelections, total: total }
	}

	saveForLater() {
		let extraData = Object.assign({}, this.extraData)
		extraData.saveForLater = true
		this.extraData = extraData
	}

	setSendNow() {
		let extraData = Object.assign({}, this.extraData)
		extraData.saveForLater = false
		this.extraData = extraData
	}

	response(resp) {
		console.log('the quote response: ', resp)
	}

	render() {
		return (
			<div id='questionaire-main'>
				<div id='options-main'>
					<p className='text'>Build A Client Quote</p>
					{/* prettier-ignore */}
					<form onSubmit={this.rfa_onSubmit}>
                        <Input name="fname" label="First Name" value={this.state.fname} onChange={this.rfa_onChange} />  
                        <Input name="lname" label="Last Name" value={this.state.lname} onChange={this.rfa_onChange} />    
                        <Input name="email" label="Email" value={this.state.email} onChange={this.rfa_onChange} />
						<Select
							name='eventType'
							label='Event Type'
							options={[
								'Wedding', 'Mitzvah', 'anniversary', 'corporate', 'Birthday', 'Vow Renewal',
								'More than 6 months'
							]}
							value={this.state.eventType}
							onChange={this.rfa_onChange}
							multiple={false}
						/>
                        {this.state.display}
                        <div id='price-main'>
						<p className='text'>{`Total Estimated Cost: $${
							this.state.total
						}`}</p>
					</div>
                    <div className="rfa_button-div">
                        <Button id="submit" value="Complete and Send" onClick={this.setSendNow}/>
                    </div>
					<div className="rfa_button-div">
                        <Button id="submit" value="Save and Send Later" onClick={this.saveForLater} />
                    </div>
                   
				</form>
				</div>
			</div>
		)
	}
}

export default BuildQuote
