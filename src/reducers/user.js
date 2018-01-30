export default function user(state = {
  fetching: false,
  fetched: false,
  error: null,
  logInError: null,
  sessionToken: "",
  currentUserId: null,
  clientData: {}
}, action) {

  switch (action.type) {

    case "LOGGING_IN_USER":
      {
        return {
          ...state,
          fetching: true,
          fetched: false
        };
      }
    case "USER_LOG_IN_SUCCESS":
      {
        //console.log(state);
        return {
          ...state,
          currentUserId: action.payload.userId,
          fetching: false,
          fetched: true,
          sessionToken: action.payload.session_token,
          clientData: {}
        };
      }
    case "LOG_IN_REJECTED":
      {
        return {
          ...state,
          fetching: false,
          logInError: action.payload
        }
      }
      case "USER_LOG_OUT_SUCCESS":
      {
        return {
          ...state,
          currentUserId: null,
          clientData: {},
          sessionToken: ""
        }
      }
      case "FETCHING_CLIENT_DATA":
        {
          return {
            ...state,
            fetching: true,
            fetched: false
          };
        }
    case "FETCHING_CLIENT_DATA_FULFILLED":
      {
        return {
          ...state,
          clientData: action.payload,
          fetching: false,
          fetched: true
        };
      }
      case "FETCHING_BANDWIDTH_DATA_REJECTED":
      {
        return {
          ...state,
          fetching: false,
          fetched: false,
          error: action.payload,
          clientData: {}
        }
      }

  }

  return state

}
