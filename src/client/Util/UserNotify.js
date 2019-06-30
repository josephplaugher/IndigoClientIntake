import React from 'react'

const UserNotify = (props) => {
	var returnObj = null
	if (props.type === 'error') {
		returnObj = <p className='error'>{props.error}</p>
	}
	if (props.type === 'message') {
		returnObj = <p className='userNotify'>{props.message}</p>
	}
	return returnObj
}

export default UserNotify
