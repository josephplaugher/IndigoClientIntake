import React from 'react'
import { FormClass, Input, Button } from 'reactform-appco'
import ValRules from 'Util/ValRules'
import UserNotify from 'Util/UserNotify'

class NewClient extends FormClass {
	constructor(props) {
		super(props)
		this.useLiveSearch = false
		this.route = '/newClient'
		this.valRules = ValRules
		this.state = {
			userNotify: { error: '', message: '' },
			fname: '',
			lname: '',
			email: '',
			formData: {
				fname: '',
				lname: '',
				email: ''
			}
		}
		this.response = this.response.bind(this)
	}

	response(resp) {
		this.setState({ userNotify: resp.data.userNotify })
	}

	render() {
		return (
			<div id='add-client' className='submenu'>
				<p className='form-title'>Add New Client</p>
				{/* <UserNotify userNotify={this.state.userNotify} /> */}
				{/* prettier-ignore */}
				<form onSubmit={this.rfa_onSubmit}>
                    <Input name="fname" label="First Name" value={this.state.fname} onChange={this.rfa_onChange} autoComplete={true}/>  
                    <Input name="lname" label="Last Name" value={this.state.lname} onChange={this.rfa_onChange} autoComplete={true}/>    
                    <Input name="email" label="Email" value={this.state.email} onChange={this.rfa_onChange} autoComplete={true}/>
                    <div className="rfa_button-div">
                        <Button id="submit" value="Add Client" />
                    </div>
				</form>
			</div>
		)
	}
}

export default NewClient
