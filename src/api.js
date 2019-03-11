
//funtion to add a new user to the API, is called from an event listener in the "sign up" page

const addUserToApi = (name, username) => {
    const options = {
        method: 'POST',
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username })
    }
    return fetch(USERSURL, options)
        .then(resp => {
            if (resp.ok)
                return resp.json()
            else
                return Promise.reject(resp)
        })
        .catch(resp => {
            try {
                console.error(resp.json())
            // append error box to form with resp.json().error message
            } catch (e) {
                console.error(e)
            // append error box to form with "oops something went wrong"
            }
        })
}

const signIn = (username) => {
    const options = {
        method: 'POST',
        headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    }
    return fetch(SIGNINURL, options)
        .then(resp => resp.json())
}

// ==================Get Locations on startup=====================================

const getRegions = () => fetch(REGIONURL).then(resp => resp.json())

const storeRegions = (regions) =>{

  const randValue = () => {
    return Math.floor(Math.random() * 5);
  }
   allRegions.push(regions)
}

const addGameToApi = (user_id, score ) =>
    fetch(GAMESURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id, score})
    }).then(resp => resp.json())


// ==================Get Current Scoreboard on startup =====================================

const getUsers = () => fetch(USERSURL).then(resp => resp.json())

const renderScores = users => {
  users.forEach(user => storeScore(user))
}

const storeScore = user => {
  user.games.map(game =>{
    let score = [user.username, game.score]
    allScores.push(score)
  })
}
