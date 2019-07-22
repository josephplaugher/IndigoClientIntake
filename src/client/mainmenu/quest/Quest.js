import React from 'react'
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'
import { Button } from 'reactform-appco'

class Quest extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			display: [],
			total: 0,
			viewLargeImage: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.updateList = this.updateList.bind(this)
		this.getDecorList = this.getDecorList.bind(this)
		this.enlargeThumbnail = this.enlargeThumbnail.bind(this)
		this.closeImage = this.closeImage.bind(this)
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
				<img
					className='thumbnail'
					src={item.image}
					alt='image'
					onClick={this.enlargeThumbnail}
				/>
				<p key={`${item.id}-p`} className='item-p'>
					{item.item}
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

		let total = parseFloat(this.state.total)
		if (value) {
			total = parseFloat(total) + parseFloat(price)
		} else {
			total = parseFloat(total) - parseFloat(price)
		}
		this.setState({
			[name]: value,
			total: parseFloat(total)
		})
	}

	enlargeThumbnail(event) {
		this.setState({ viewLargeImage: event.target.src })
	}

	closeImage() {
		this.setState({ viewLargeImage: false })
	}

	render() {
		return (
			<div id='questionaire-main'>
				<div>
					<p className='text'>Select the options for your event</p>
				</div>
				<div id='options-main'>{this.state.display}</div>
				<div id='price-main'>
					<p className='text'>Total Estimated Cost: {this.state.total}</p>
				</div>
				<br />
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
			</div>
		)
	}
}

export default Quest
