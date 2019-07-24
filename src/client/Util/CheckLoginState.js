import Ajax from './Ajax'
import SetUrl from './SetUrl'

const checkLoginState = (newToken) => {
	//a newToken is provided only if CheckLoginState is called after a CRUD operation
	//otherwise the token in sessionStorage will be used. This will only occur
	// on a users page refresh
	return new Promise((resolve, reject) => {
		var AppCoToken = ''
		if (newToken) {
			sessionStorage.setItem(process.env.TOKEN_NAME, newToken)
			AppCoToken = newToken
		} else {
			AppCoToken = sessionStorage.getItem(process.env.TOKEN_NAME)
		}
		//if there is a token
		// console.log('appco token: ', AppCoToken)
		if (AppCoToken) {
			Ajax.get(SetUrl() + '/checkLoginState')
				.catch((e) => {
					reject('error checking login state: ', e)
				})
				.then((response) => {
					console.log('check login resp token: ', response.headers.token)
					console.log('check login resp auth: ', response.headers.authorized)
					if (response.headers.token && response.headers.authorized) {
						let userData = JSON.parse(
							sessionStorage.getItem(process.env.USER_DATA_LABEL)
						)
						sessionStorage.setItem(
							process.env.TOKEN_NAME,
							response.headers.token
						)
						resolve({
							isLoggedIn: true,
							userData: userData
						})
					} else {
						console.log('no response headers for auth')
						sessionStorage.removeItem(process.env.USER_DATA_LABEL)
						sessionStorage.removeItem(process.env.TOKEN_NAME)
						resolve({
							isLoggedIn: false,
							userData: {}
						})
					}
				})
		} else {
			//if there is no token
			console.log('there is no token')
			sessionStorage.removeItem(process.env.USER_DATA_LABEL)
			sessionStorage.removeItem(process.env.TOKEN_NAME)
			resolve({
				isLoggedIn: false,
				userData: {}
			})
		}
	})
}

export default checkLoginState
