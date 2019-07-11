const MenuStyle = {
	closed: {
		backgroundColor: 'lightgrey',
		height: '0%',
		width: '95%',
		zIndex: '10',
		position: 'absolute',
		// transitionDuration: '0.5s',
		transitionProperty: 'height',
		marginTop: '40px',
		padding: '5px',
		color: 'black',
		backgroundColor: 'white',
		borderRadius: '5px',
		borderColor: '#1c2258',
		borderStyle: 'solid',
		borderWidth: '2px'
	},
	transition: {
		height: 'auto'
	}
}

export default MenuStyle
