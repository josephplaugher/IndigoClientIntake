import React from 'react'

import 'css/quest.scss'

class Quest extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			temp: [
				{ item: 'item 1', price: 100.0, checked: false },
				{ item: 'item 2', price: 200.0, checked: false },
				{ item: 'item 3', price: 300.0, checked: false }
			],
			display: []
		}
	}

	componentDidMount() {
		let display = this.state.temp.map((item) => (
			<div className='item-row' key={`${item.item}-div`}>
				<p key={`${item.item}-p`} className='item-p'>{`${item.item} | $${
					item.price
				} `}</p>
				<input
					type='checkbox'
					className='item-check'
					name={item.item}
					value={item.price}
				/>
			</div>
		))
		this.setState({ display: display })
	}

	render() {
		return (
			<div id='questionaire-main'>
				<p className='text'>Select the options for your event</p>
				{this.state.display}
			</div>
		)
	}
}

export default Quest
