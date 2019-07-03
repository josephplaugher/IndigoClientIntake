import React from 'react'
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'

class Quest extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			display: [],
			total: 0
		}
		this.handleChange = this.handleChange.bind(this)
		this.updateList = this.updateList.bind(this)
		this.getDecorList = this.getDecorList.bind(this)
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
					id={item.price}
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
		const price = target.id
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name
		console.log('change: name ', name, 'value ', value, 'price ', price)

		let total = parseFloat(this.state.total)
		console.log('initial total: ', total)
		if (value) {
			total = parseFloat(total) + parseFloat(price)
			console.log('adding total: ', total)
		} else {
			total = parseFloat(total) - parseFloat(price)
			console.log('subt total: ', total)
		}
		console.log('new total: ', total)
		this.setState({
			[name]: value,
			total: parseFloat(total)
		})
	}

	render() {
		return (
			<div id='questionaire-main'>
				<div id='options-main'>
					<p className='text'>Select the options for your event</p>
					{this.state.display}
				</div>
				<div id='price-main'>
					<p className='text'>Total Estimated Cost: {this.state.total}</p>
				</div>
			</div>
		)
	}
}

export default Quest
