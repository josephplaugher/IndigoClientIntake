import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from './User'
import QuestAdmin from './Quest/QuestAdmin'
import CreditCard from './payment/CreditCard'
import ACHHome from './payment/ACHHome'
import { Elements } from 'react-stripe-elements'

import 'css/admin-main.scss'

class AdminHome extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div id='admin-home-container'>
				<User userData={this.props.userData} signOut={this.props.signOut} />
				<Router>
					{/* prettier-ignore */}
					<div id="admin-nav-pane">  
					<Link to="/options" className="nav">Decor Options</Link>
            			<Route path="/options" 
						render={(props) => <QuestAdmin />}
						/>   
					<Link to="/contracts" className="nav">Contracts</Link>
            			<Route path="/contracts" 
						render={(props) => <div>This can be whatever you want it to be. List of contracts pending signature, a place to edit your standard contract, etc...</div>}
						/>      
				
					</div>
				</Router>
			</div>
		)
	}
}

export default AdminHome
