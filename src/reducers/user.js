export default function user(state = {
  fetching: false,
  fetched: false,
  error: null,
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
          sessionToken: action.payload.session_token
        };
      }
    case "LOG_IN_REJECTED":
      {
        return {
          ...state,
          fetching: false,
          error: action.payload
        }
      }

    case "FETCHING_CLIENT_DATA_FULFILLED":
      {
        return {
          ...state,
          clientData: action.payload
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
