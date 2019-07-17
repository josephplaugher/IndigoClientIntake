import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import ReactTable from 'react-table'
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'
import LightBox from 'lightbox-appco'
import MenuStyle from './../MenuStyle'
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
		//this.closeLightBox = this.closeLightBox.bind(this)
		// this.updateList = this.updateList.bind(this)
		this.getAllQuotes = this.getAllQuotes.bind(this)
		this.showQuotesList = this.showQuotesList.bind(this)
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
				console.log('the quotes: ', resp.data.quotes)
				this.setState({ quotes: resp.data.quotes })
			})
	}

	updateItem(event) {
		this.setState({ editView: true, editData: event })
	}

	showQuotesList() {
		this.setState({ editView: false })
	}

	// closeLightBox() {
	// 	this.setState({ editView: false })
	// }

	changeItem() {}

	render() {
		const columns = [
			{ Header: 'Quote ID', accessor: 'id' },
			{ Header: 'Email', accessor: 'email' },
			{ Header: 'Event', accessor: 'event_type' },
			{ Header: 'Total', accessor: 'total_cost' }
		]

		return (
			<>
				{this.state.editView ? (
					<>
						<EditView
							data={this.state.editData}
							refreshOptions={this.getAllQuotes}
							//close={this.closeLightBox}
						/>
						<Button
							id='view-quote-list'
							value='Back to Quotes List'
							onClick={this.showQuotesList}
						/>
					</>
				) : (
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
				)}
			</>
		)
	}
}

export default ViewQuotes
