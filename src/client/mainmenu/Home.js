import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from './User'
import AdminHome from './AdminHome'
import { Menu, MenuButton } from 'menu-appco'
import MenuSyle from './MenuStyle'
import Quest from './quest/Quest'
import CreditCard from './payment/CreditCard'
import ACHHome from './payment/ACHHome'
import { Elements } from 'react-stripe-elements'

import 'css/customer-main-desktop.scss'
import 'css/customer-main-mobile.scss'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = { showUserMenu: false }
		this.toggleUserMenu = this.toggleUserMenu.bind(this)
	}

	toggleUserMenu() {
		if (this.state.showUserMenu === true) {
			this.setState({ showUserMenu: false })
		} else {
			this.setState({ showUserMenu: true })
		}
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
						<div id='menu-container'>
							<MenuButton
								style={{ bordercolor: 'grey' }}
								barStyle={{ backgroundColor: 'black' }}
								onClick={this.toggleUserMenu}
							/>
							{this.state.showUserMenu ? (
								<Menu
									closeIcon={null}
									showMenu={this.state.showUserMenu}
									closeHandler={this.toggleUserMenu}
									style={MenuSyle}
								>
									<User
										userData={this.props.userData}
										signOut={this.props.signOut}
									/>
								</Menu>
							) : null}
						</div>
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
					<Link to="/ach" className="nav">Pay With ACH</Link>
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
