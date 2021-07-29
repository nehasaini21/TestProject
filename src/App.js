import "./styles.css";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";

const initialState = {
  user: [],
  error: ""
};

const reduce = (state, action) => {
  switch (action.type) {
    case "OnSuccess":
      return {
        user: action.payload,
        error: ""
      };
    case "OnFailure":
      return {
        user: [],
        error: "Something went wrong"
      };

    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reduce, initialState);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log(response);
        dispatch({ type: "OnSuccess", payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: "OnFailure" });
      });
  }, []);

  const [name, setName] = useState("");

  const changeName = (e) => {
    setName(e.target.value);
  };

  const appendValue = () => {
    if (name) {
      let newObj = [
        {
          id: state.user.length + 1,
          name: name
        }
      ];

      dispatch({ type: "OnSuccess", payload: [...newObj, ...state.user] });
    }
  };

  return (
    <div className="App">
      <form>
        <div>
          <label htmlFor="name">Enter Name:</label>
          <br />
          <input
            id="name"
            type="text"
            onChange={changeName}
            value={name}
            placeholder="Enter your name here"
          />
        </div>
        <br />
        <button onClick={appendValue} type="button" className="w100 tc">
          Add
        </button>
      </form>

      <ul>
        {state.user.length > 0 &&
          state.user.map((item, i) => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
