import React, { Component } from 'react'
import { Button } from 'reactform-appco'

class User extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: null
		}
	}

	render() {
		var signed
		if (
			this.props.admin === true ||
			this.props.admin === 'true' ||
			this.props.admin === 't'
		) {
			signed = `Current User: ${this.props.userData.lname}, ${
				this.props.userData.fname
			}: Administrator`
		} else {
			signed = `Current User: ${this.props.userData.lname}, ${
				this.props.userData.fname
			}`
		}

		return (
			<div id='user'>
				<p>{signed}</p>
				<Button id='sign out' value='Sign Out' onClick={this.props.signOut} />
			</div>
		)
	}
}

export default User
