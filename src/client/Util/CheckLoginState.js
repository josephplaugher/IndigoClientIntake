import Ajax from './Ajax'
import SetUrl from './SetUrl'

const checkLoginState = (newToken) => {
	// A newToken is provided only if CheckLoginState is called after a CRUD operation.
	// Otherwise the token in sessionStorage will be used. This will only occur
	// on a user's page refresh.
	return new Promise((resolve, reject) => {
		if (newToken) {
			// Set the new token in sessionStorage for continued use.
			// We're done here.
			sessionStorage.setItem(process.env.TOKEN_NAME, newToken)
		} else {
			// If no token provided, this method was called on initial sign in
			// or on page refresh and it validate the users signed in status
			var AppCoToken = sessionStorage.getItem(process.env.TOKEN_NAME)
			if (AppCoToken) {
				// Check if there is a token in sessionStorage. If not the user
				// is signed out
				Ajax.get(SetUrl() + '/checkLoginState')
					.catch((e) => {
						reject('error checking login state: ', e)
					})
					.then((response) => {
						console.log('check login resp token: ', response.headers.token)
						if (response.headers.token) {
							// If the token is returned from the server
							// the login has been validated.
							// Get the user data from sessionStorage to return
							// to App.js and place back into state
							// and set login status to true.
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
							console.log('no token returned')
							// If no token is return in the headers, the user
							// could not be authenticed and is signed out.
							sessionStorage.removeItem(process.env.USER_DATA_LABEL)
							sessionStorage.removeItem(process.env.TOKEN_NAME)
							resolve({
								isLoggedIn: false,
								userData: {}
							})
						}
					})
			} else {
				// If there is no token in sessionStorage
				// and there was no token returned by the server
				// the user cannot be authenticated and is signed out.
				console.log('there is no token')
				sessionStorage.removeItem(process.env.USER_DATA_LABEL)
				sessionStorage.removeItem(process.env.TOKEN_NAME)
				resolve({
					isLoggedIn: false,
					userData: {}
				})
			}
		}
	})
}

export default checkLoginState
