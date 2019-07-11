import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from './User'
import QuestAdmin from './admin/QuestAdmin'
import NewClient from './admin/NewClient'
import BuildQuote from './admin/BuildQuote'
import { Menu, MenuButton } from 'menu-appco'
import MenuSyle from './MenuStyle'
import CreditCard from './payment/CreditCard'
import ACHHome from './payment/ACHHome'
import { Elements } from 'react-stripe-elements'

import 'css/admin-main-desktop.scss'
import 'css/admin-main-mobile.scss'

class AdminHome extends React.Component {
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
			<div id='admin-home-container'>
				<p id='admin-title' className='text'>
					Administrative Quote Dashboard
				</p>
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
								closeHandler={this.toggleUserMenu}
								userData={this.props.userData}
								signOut={this.props.signOut}
							/>
						</Menu>
					) : null}
				</div>
				<Router>
					{/* prettier-ignore */}
					<div id="admin-nav-pane">  
					<Link to="/options" className="nav">Decor Options</Link>
            			<Route path="/options" 
						render={(props) => <QuestAdmin />}
						/>   
					<Link to="/new-client" className="nav">Add New Client</Link>
            			<Route path="/new-client" 
						render={(props) => <NewClient />}
						/>  
					<Link to="/build-quote" className="nav">Build A Quote</Link>
            			<Route path="/build-quote" 
						render={(props) => <BuildQuote />}
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
