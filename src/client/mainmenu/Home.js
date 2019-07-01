import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from './User'
import AdminHome from './AdminHome'
import Quest from './quest/Quest'
import CreditCard from './payment/CreditCard'
import ACHHome from './payment/ACHHome'
import { Elements } from 'react-stripe-elements'

import 'css/customer-main.scss'

class Home extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<>
				{this.props.userData.admin ? (
					<AdminHome
						userData={this.props.userData}
						resfreshSources={this.props.refreshStripeSources}
						signOut={this.props.signOut}
					/>
				) : (
					<div id='home-container'>
						<User userData={this.props.userData} signOut={this.props.signOut} />
						<Router>
							{/* prettier-ignore */}
							<div id="nav-pane">  
					<Link to="/quest" className="nav">Questionaire</Link>
            			<Route path="/quest" 
						render={(props) => <Quest />}
						/>      
					<Link to="/cc" className="nav">Pay With Credit Card</Link>
						<Route path="/cc" 
						render={(props) => <Elements><CreditCard {...props} method="CC"/></Elements>}
						/>
					<br/><Link to="/ach" className="nav">Pay With ACH</Link>
						<Route path="/ach" 
						render={(props) => <Elements><ACHHome userData={this.props.userData} method="ACH"/></Elements>}
						/>
					</div>
						</Router>
					</div>
				)}
			</>
		)
	}
}

export default Home
