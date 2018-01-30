import {url} from '../config'

// back 60 days
const fromTimestamp = new Date().getTime() - 3600000 - 3600000 * 24 * 60 - 100;
const nowTimestamp = new Date().getTime() - 100;

export function logIn(userId, password) {
  return function(dispatch) {

    dispatch({type: "LOGGING_IN_USER"});

    fetch(url + '/auth', {
      method: 'POST',
      "crossDomain": true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `identifiant=${userId}&password=${password}`
    }).then(data => {
      return data.json()

    }).then(data => {
      localStorage.setItem('session_token', data.session_token);
      data.userId = userId
      dispatch({type: "USER_LOG_IN_SUCCESS", payload: data});

      getClientData(dispatch, data.session_token)

    }).catch(error => {
      console.error('Error:', error)
      dispatch({type: "LOG_IN_REJECTED", payload: error})
    })
  }
}

export function logOut(sessionId) {
  return function(dispatch) {

    dispatch({type: "LOGGING_OUT_USER"});
    fetch(url + '/logout', {
      method: 'POST',
      "crossDomain": true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `session_token=${sessionId}`
    }).then((res) => {
      dispatch({type: "USER_LOG_OUT_SUCCESS"});
    }).catch(error => {
      console.error('Error:', error)
      dispatch({type: "LOG_OUT_REJECTED", payload: error})
    })
  }
}

function getClientData(dispatch, sessionToken) {
  
  dispatch({type: "FETCHING_CLIENT_DATA"});
  const aggregateParams = ['', 'sum', 'average', 'max', 'min'];
  let promises = [];
  aggregateParams.forEach(param => {
    promises.push(getBandwidthData(sessionToken, param))
  })
  aggregateParams.forEach(param => {
    promises.push(getAudienceData(sessionToken, param))
  })
  Promise.all(promises).then((data) => {

    //console.log(data);
    let p2p = []
    data[0].p2p.forEach(cell => {
      p2p.push([
        cell[0], cell[1] / 1000 / 1000 / 1000
      ]);
    })
    let cdn = []
    data[0].cdn.forEach(cell => {
      cdn.push([
        cell[0], cell[1] / 1000 / 1000 / 1000
      ]);
    })
    const cdnp2p = {
      cdn: cdn,
      p2p: p2p
    }
    const result = {
      bandwidth: {
        data: cdnp2p,
        sum: data[1],
        average: data[2],
        max: data[3],
        min: data[4]
      },
      audience: {
        data: data[5],
        sum: data[6],
        average: data[7],
        max: data[8],
        min: data[9]
      }
    }
  //  console.log("RESULT ", result);
    dispatch({type: "FETCHING_CLIENT_DATA_FULFILLED", payload: result});
  }).catch(err => {
    console.log(err.message);
    dispatch({type: "FETCHING_BANDWIDTH_DATA_REJECTED", payload: err});
  })
}

function getBandwidthData(sessionId, param, from, to) {
  from = from || fromTimestamp;
  to = to || nowTimestamp;
  const aggregate = param
    ? '&aggregate=' + param
    : '';
  return fetch(url + '/bandwidth', {
    method: 'POST',
    "crossDomain": true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `session_token=${sessionId}&from=${from}&to=${to}${aggregate}`
  }).then(res => res.json()).catch(error => {
    console.error('Error:', error)
  })
}

function getAudienceData(sessionId, param, from, to) {
  from = from || fromTimestamp;
  to = to || nowTimestamp;
  const aggregate = param
    ? '&aggregate=' + param
    : '';
  return fetch(url + '/audience', {
    method: 'POST',
    "crossDomain": true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `session_token=${sessionId}&from=${from}&to=${to}${aggregate}`
  }).then(res => res.json()).catch(error => {
    console.error('Error:', error)
  })
}
