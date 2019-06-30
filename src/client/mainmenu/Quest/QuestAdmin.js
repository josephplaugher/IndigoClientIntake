import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'
import LightBox from 'lightbox-appco'
import EditView from './EditView'

class QuestAdmin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			display: [],
			list: [],
			editView: false,
			editData: {}
		}
		this.changeItem = this.changeItem.bind(this)
		this.updateItem = this.updateItem.bind(this)
		this.closeLightBox = this.closeLightBox.bind(this)
		// this.updateList = this.updateList.bind(this)
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
				// this.updateList(resp.data.list)
				this.setState({ list: resp.data.list })
			})
	}

	updateItem(event) {
		console.log('event target: ', event.target.id)
		this.setState({ editView: true, editData: JSON.parse(event.target.id) })
	}

	closeLightBox() {
		this.setState({ editView: false })
	}

	changeItem() {}

	render() {
		let display = this.state.list.map((item) => (
			<div className='item-row' key={`${item.item}-div`}>
				<p key={`${item.item}-p`} className='item-p'>
					{item.item}
				</p>
				<p key={`${item.category}-p`} className='item-p'>
					{`Category: ${item.category} `}
				</p>
				<p key={`${item.price}-p`} className='price-p'>
					${item.price}
				</p>
				<div className='rfa_button-div'>
					<Button
						value='Update'
						id={JSON.stringify(item)}
						onClick={this.updateItem}
					/>
				</div>
			</div>
		))

		return (
			<div id='questionaire-main'>
				<div id='options-main'>
					<p className='text'>Add or edit decor options</p>
					{display}
				</div>
				{this.state.editView ? (
					<LightBox
						backgroundDimmer='2'
						style={{
							zIndex: '10',
							margin: '25px auto auto auto',
							padding: '25px',
							width: '300px',
							height: 'auto',
							backgroundColor: 'white',
							borderRadius: '5px',
							borderColor: '#2665c4',
							borderStyle: 'solid',
							borderWidth: '3px',
							top: '20',
							left: '20'
						}}
						close={this.closeLightBox}
						refreshOptions={this.getDecorList}
					>
						<EditView data={this.state.editData} />
					</LightBox>
				) : null}
			</div>
		)
	}
}

export default QuestAdmin
