// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return Object.assign({}, state, action.response.entities);
  }

  return state;
};

export default entities;
