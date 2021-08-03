function data(state = {}, action) {
    switch (action.type) {
      case "SET_DATA":
        return {
            ...state,
            [Object.keys(action.payload)]: action.payload[Object.keys(action.payload).toString()]
        };
      default:
        return state;
    }
  }
  export default data;