import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import ReactTable from 'react-table'
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'
import LightBox from 'lightbox-appco'
import EditView from './EditView'

import 'react-table/react-table.css'

class ViewQuotes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			display: [],
			quotes: [],
			editView: false,
			editData: {}
		}
		this.changeItem = this.changeItem.bind(this)
		this.updateItem = this.updateItem.bind(this)
		this.closeLightBox = this.closeLightBox.bind(this)
		// this.updateList = this.updateList.bind(this)
		this.getAllQuotes = this.getAllQuotes.bind(this)
	}

	componentDidMount() {
		this.getAllQuotes()
	}

	getAllQuotes() {
		Ajax.get(SetUrl() + '/getAllQuotes')
			.catch((error) => {
				reject('error geting decor list: ', error)
			})
			.then((resp) => {
				this.setState({ quotes: resp.data.quotes })
			})
	}

	updateItem(event) {
		this.setState({ editView: true, editData: event })
	}

	closeLightBox() {
		this.setState({ editView: false })
	}

	changeItem() {}

	render() {
		const columns = [
			{ Header: 'Quote ID', accessor: 'id' },
			{ Header: 'Client', accessor: 'clientid' }
		]

		return (
			<>
				<div id='options-main'>
					<p className='text'>View Quotes</p>
					<ReactTable
						filterable
						minRows={0}
						getTdProps={(state, rowInfo, column, instance) => {
							return {
								onClick: (e, handleOriginal) => {
									this.updateItem(rowInfo.original)
								}
							}
						}}
						data={this.state.quotes}
						columns={columns}
					/>
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
					>
						<EditView
							data={this.state.editData}
							refreshOptions={this.getAllQuotes}
							close={this.closeLightBox}
						/>
					</LightBox>
				) : null}
			</>
		)
	}
}

export default ViewQuotes
