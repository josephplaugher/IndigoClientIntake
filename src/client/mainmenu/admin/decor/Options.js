import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import ReactTable from 'react-table'
import SetUrl from 'Util/SetUrl'
import Ajax from 'Util/Ajax'
import CheckLoginState from 'Util/CheckLoginState'
import EditView from './EditView'
import AddNewDecorItem from './AddNewDecorItem'

import 'react-table/react-table.css'

class Options extends React.Component {
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
		this.changeItem = this.changeItem.bind(this)
		this.updateItem = this.updateItem.bind(this)
		this.showAddNew = this.showAddNew.bind(this)
		this.showEditView = this.showEditView.bind(this)
		this.showTableView = this.showTableView.bind(this)
		this.getDecorList = this.getDecorList.bind(this)
	}

	componentDidMount() {
		this.getDecorList()
	}

	getDecorList() {
		Ajax.get(SetUrl() + '/docor/getDecorList')
			.catch((error) => {
				reject('error geting decor list: ', error)
			})
			.then((resp) => {
				CheckLoginState(resp.headers.token)
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

	changeItem() {}

	render() {
		const columns = [
			{ Header: 'Item', accessor: 'item' },
			{ Header: 'Category', accessor: 'catergory' },
			{ Header: 'Price', accessor: 'price' }
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
					<AddNewDecorItem
						refreshOptions={this.getDecorList}
						close={this.showTableView}
					/>
				) : null}
				{this.state.showEditView ? (
					<EditView
						data={this.state.editData}
						refreshOptions={this.getDecorList}
						close={this.showTableView}
					/>
				) : null}
			</>
		)
	}
}

export default Options
