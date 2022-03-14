import axios from "axios";

export const dataReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {z:action.x};
    default:
      return state;
  }
};

export async function fetchTodos(dispatch, getState) {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  dispatch({ type: 'SET_DATA', payload: response.todos })
}
