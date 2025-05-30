import { useReducer } from 'react'
import UseState from '../UseState'


const intialState = 0
const reducer = (state,action) => {
  switch(action){
    case "increment": return state + 1
    case "decrement": return state - 1
    case "reset": return intialState
    default: return state
  }
}



const UseReducer = ( ) => {
    const [count,dispatch] = useReducer(reducer,intialState)
    console.log("useReducer re-render")
    return (
        <div>
          <UseState/>
            <h1>Count: {count}</h1>
            <button onClick={()=>dispatch("increment")}>Increment</button>
            <button onClick={()=>dispatch("decrement")}>Decrement</button>
            <button onClick={()=>dispatch("reset")}>Reset</button>
        </div>
    )
}

export default UseReducer