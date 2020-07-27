import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import ReactTable from 'react-table'
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'
import QuoteDetail from './QuoteDetail'

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
		this.getAllQuotes = this.getAllQuotes.bind(this)
		this.showQuotesList = this.showQuotesList.bind(this)
	}

	componentDidMount() {
		this.getAllQuotes()
	}

	getAllQuotes() {
		Ajax.get(SetUrl() + '/client/getAllQuotes')
			.catch((error) => {
				reject('error geting decor list: ', error)
			})
			.then((resp) => {
				console.log('the quotes: ', resp.data.quotes)
				this.setState({ quotes: resp.data.quotes || [] })
			})
	}

	updateItem(event) {
		this.setState({ editView: true, editData: event })
	}

	showQuotesList() {
		this.setState({ editView: false })
	}

	changeItem() {}

	render() {
		const columns = [
			{ Header: 'Email', accessor: 'email' },
			{ Header: 'Event', accessor: 'event_type' },
			{ Header: 'Total', accessor: 'total_cost' }
		]

		return (
			<>
				{this.state.editView ? (
					<>
						<QuoteDetail
							data={this.state.editData}
							refreshOptions={this.getAllQuotes}
						/>
						<div className='rfa_button-div'>
							<Button
								id='view-quote-list'
								value='Back to Quotes List'
								onClick={this.showQuotesList}
							/>
						</div>
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
