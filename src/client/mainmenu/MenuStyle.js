const MenuStyle = {
	open: {
		backgroundColor: 'lightgrey',
		height: 'auto',
		width: '95%',
		zIndex: '10',
		position: 'absolute',
		transition: '0.15s',
		marginTop: '40px',
		padding: '5px',
		color: 'black',
		backgroundColor: 'white',
		borderRadius: '5px',
		borderColor: '#1c2258',
		borderStyle: 'solid',
		borderWidth: '2px'
	},
	Closed: {
		backgroundColor: 'lightgrey',
		height: '0%',
		width: '95%',
		zIndex: '10',
		transition: '0.15s',
		margin: '0px',
		padding: '5px',
		color: 'black',
		backgroundColor: 'grey',
		borderRadius: '5px',
		borderColor: '#1c2258',
		borderStyle: 'solid',
		borderWidth: '2px'
	}
}

export default MenuStyle
