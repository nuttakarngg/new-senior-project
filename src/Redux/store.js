function data(state = {}, action) {
    switch (action.type) {
      case "SET_DATA":
        return {
            ...state,
            [Object.keys(action.payload)]: action.payload[Object.keys(action.payload).toString()]
        };
      case "GET_KEYWORD":
        return state.nav_keyword;
      case "SET_KEYWORD":
        return {...state,nav_keyword:action.payload}
      default:
        return state;
    }
  }
  export default data;