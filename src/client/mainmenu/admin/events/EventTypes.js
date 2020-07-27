import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import ReactTable from 'react-table'
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'
import EditEventTypeView from './EditEventTypeView'
import AddNewEventType from './AddNewEventType'

import 'react-table/react-table.css'

class EventTypes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			display: [],
			list: [],
			tableView: true,
			editView: false,
			addItemView: false,
			editData: {}
		}
		this.updateItem = this.updateItem.bind(this)
		this.showAddNew = this.showAddNew.bind(this)
		this.showEditView = this.showEditView.bind(this)
		this.showTableView = this.showTableView.bind(this)
		this.getEventTypes = this.getEventTypes.bind(this)
	}

	componentDidMount() {
		this.getEventTypes()
	}

	getEventTypes() {
		Ajax.get(SetUrl() + '/decor/getAllEventTypes')
			.catch((error) => {
				reject('error geting decor list: ', error)
			})
			.then((resp) => {
				console.log('data: ', resp)
				this.setState({ list: resp.data.list })
			})
	}

	updateItem(event) {
		this.setState({ showEditView: true, tableView: false, editData: event })
	}

	showAddNew() {
		this.setState({ showAddNew: true, tableView: false, showEditView: false })
	}

	showEditView() {
		this.setState({ showEditView: true, tableView: false, showAddNew: false })
	}

	showTableView() {
		this.setState({ showEditView: false, showAddNew: false, tableView: true })
	}

	render() {
		const columns = [
			{ Header: 'ID', accessor: 'id' },
			{ Header: 'Type', accessor: 'event_type' }
		]

		return (
			<>
				{this.state.tableView ? (
					<div id='options-main'>
						<Button
							id='add-new'
							value='Add New Item'
							onClick={this.showAddNew}
						/>
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
							data={this.state.list}
							columns={columns}
						/>
					</div>
				) : null}
				{this.state.showAddNew ? (
					<AddNewEventType
						refreshOptions={this.getEventTypes}
						close={this.showTableView}
					/>
				) : null}
				{this.state.showEditView ? (
					<EditEventTypeView
						data={this.state.editData}
						refreshOptions={this.getEventTypes}
						close={this.showTableView}
					/>
				) : null}
			</>
		)
	}
}

export default EventTypes
