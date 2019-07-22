import React from 'react'
import { FormClass, Input, Select, Button } from 'reactform-appco'
import ValRules from 'Util/ValRules'
import UserNotify from 'Util/UserNotify'
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'
import LightBox from 'lightbox-appco'

import './thumbnail.scss'

class QuoteDetail extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/editQuote'
		this.valRules = ValRules
		this.extraData = { id: this.props.data.id }
		this.state = {
			userNotify: { error: '', message: '' },
			// all the this.props.data items are the header that
			// was fetch prior to this component opening. now that
			// this component is open we'll fetch the line items for display
			id: this.props.data.id,
			fname: '',
			lname: '',
			email: this.props.data.email,
			eventType: this.props.data.event_type,
			total: this.props.data.total_cost,
			quoteLines: [],
			formData: {
				id: this.props.data.id,
				email: this.props.data.email,
				eventType: this.props.data.event_type,
				total: this.props.data.total_cost
			},
			quoteLines: [],
			viewLargeImage: false
		}
		this.response = this.response.bind(this)
		this.getQuoteLines = this.getQuoteLines.bind(this)
		this.buildQuoteLines = this.buildQuoteLines.bind(this)
		this.enlargeThumbnail = this.enlargeThumbnail.bind(this)
		this.closeImage = this.closeImage.bind(this)
	}

	componentDidMount() {
		this.getQuoteLines()
	}

	getQuoteLines() {
		Ajax.get(
			`${SetUrl()}/getQuoteLines/id/${this.state.id}/email/${this.state.email}`
		)
			.catch((error) => {
				console.log('error geting quote lines: ', error)
			})
			.then((resp) => {
				console.log('the quote lines: ', resp.data.quoteLines)
				let clientData = JSON.parse(resp.data.clientData)
				this.buildQuoteLines(resp.data.quoteLines, clientData)
			})
	}

	buildQuoteLines(quoteLines, clientData) {
		let QuoteLines = quoteLines.map((item) => (
			<div className='item-row' key={`${item.item}-div`}>
				<img
					className='thumbnail'
					src={item.image}
					alt='image'
					onClick={this.enlargeThumbnail}
				/>
				<p key={`${item.id}-p`} className='item-p'>
					{item.item}
				</p>
				<p key={`${item.price}-p`} className='price-p'>
					${item.price}
				</p>
			</div>
		))
		this.setState({
			quoteLines: QuoteLines,
			fname: clientData.fname,
			lname: clientData.lname
		})
	}

	response(resp) {
		this.setState({ userNotify: resp.data.userNotify })
		this.props.refreshOptions()
	}

	enlargeThumbnail(event) {
		this.setState({ viewLargeImage: event.target.src })
	}

	closeImage() {
		this.setState({ viewLargeImage: false })
	}

	render() {
		return (
			<div id='quote-detail'>
				<p className='form-title'>View Quote | ID: {this.state.id}</p>
				{/* prettier-ignore */}
				{/* <UserNotify userNotify={this.state.userNotify} /> */}
				<form onSubmit={this.rfa_onSubmit}>
					<Input
						name='fname'
						label='First Name'
						value={this.state.fname}
						onChange={this.rfa_onChange}
					/>
					<Input
						name='lname'
						label='Last Name'
						value={this.state.lname}
						onChange={this.rfa_onChange}
					/>
					<Input
						name='email'
						label='Email'
						value={this.state.email}
						onChange={this.rfa_onChange}
					/>
					<Select
						name='eventType'
						label='Event Type'
						options={[
							'Wedding',
							'Mitzvah',
							'anniversary',
							'corporate',
							'Birthday',
							'Vow Renewal',
							'More than 6 months'
						]}
						value={this.state.eventType}
						onChange={this.rfa_onChange}
						multiple={false}
					/>
					{this.state.quoteLines}
					<div id='enlarged-image'>
						{this.state.viewLargeImage ? (
							<>
								<Button
									id='close-image'
									value='Close Image'
									onClick={this.closeImage}
								/>
								<img
									className='large-thumbnail'
									src={this.state.viewLargeImage}
									alt='image'
								/>
							</>
						) : null}
					</div>
					<div id='price-main'>
						<p className='text'>{`Total Estimated Cost: $${
							this.state.total
						}`}</p>
					</div>
					<div className='rfa_button-div'>
						<Button
							id='submit'
							value='Complete and Send'
							onClick={this.setSendNow}
						/>
					</div>
				</form>
			</div>
		)
	}
}

export default QuoteDetail
