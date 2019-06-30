import React from 'react'

class UserNotify extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var returnObj = null
		if (this.props.userNotify.error) {
			returnObj = <p className='error'>{this.props.userNotify.error}</p>
		}
		if (this.props.userNotify.message) {
			returnObj = <p className='userNotify'>{this.props.userNotify.message}</p>
		}
		return { returnObj }
	}
}

export default UserNotify
