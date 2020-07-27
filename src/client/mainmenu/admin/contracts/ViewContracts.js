import React from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack'

class ViewContracts extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			numPages: null,
			pageNumber: 1
		}
	}

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages })
	}

	render() {
		const { pageNumber, numPages } = this.state

		return (
			<div>
				<Document
					file='./PlaugherJosephDevResume-5-19.pdf'
					onLoadSuccess={this.onDocumentLoadSuccess}
				>
					<Page pageNumber={pageNumber} />
				</Document>
				<p>
					Page {pageNumber} of {numPages}
				</p>
			</div>
		)
	}
}

export default ViewContracts
