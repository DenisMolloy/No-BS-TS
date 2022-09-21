import React, { PropsWithChildren, useCallback, useEffect, useReducer, useState, useRef } from 'react';
import './App.css';

/**
 * Components with properties
 * 
 */
// const Heading = (props:{title:string})=>(
const Heading = ({ title }: { title: string }) => (
  // <h2>{props.title}</h2>
  <h2>{title}</h2>
)

// const Box=({children} : {children: React.ReactNode})=>(
const Box: React.FC<PropsWithChildren> = ({ children }) => ( //needed for React 18
  <div style={{
    padding: "1rem",
    color: "blue",
    fontWeight: "bold"
  }}>
    {children}
  </div>
)

/**
 * Components with complex properties
 * Event Handlers
 */
const List: React.FunctionComponent<{
  //typing the props
  items: string[];
  onClick?: (item: string) => void
}> = ({ items, onClick }) => (
  <ol>
    {items.map((item, idx) => <li key={idx + item} onClick={() => onClick?.(item)}>{item}</li>)}
  </ol>
)


interface Payload {
  text: string;
}
interface Todo {
  id: number;
  done: boolean;
  text: string;
}
type ActionType =
  | { type: "ADD", text: string }
  | { type: "REMOVE", id: number };

//  DetailedHTMLProps
//  creating a button to be used by a company
// found the generic by looking at the Intrinsic Elements on https://unpkg.com/@types/react@16.4.7/index.d.ts
const Button:React.FunctionComponent<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
// adding custom props
&{
  title?: string;
}
> = ({title, children, style, ...rest}) => (
  <button 
    style={{
      ...style, 
      fontSize:"large", 
    }}
    {...rest}
  >
    {title ?? children}
  </button>
)


//  Alternative Incrementer using RETURNTYPE utility type & a custom hook
const useNumber = (initialValue:number) => useState<number>(initialValue)

// type UseNumberValue = ReturnType<useNumber> //'useNumber' refers to a value, but is being used as a type here. Did you mean 'typeof useNumber'?
type UseNumberValue = ReturnType<typeof useNumber>[0] 
type UseNumberSetValue = ReturnType<typeof useNumber>[1] 

 // used in Prop drilling useStatebelow
 const Incrementer: React.FunctionComponent<{
  // value: number;
  // // the type was found by hovering over a useState Setter
  // setValue: React.Dispatch<React.SetStateAction<number>>

  // update after creating useNumber and associated types
  value: UseNumberValue;
  setValue: UseNumberSetValue
 }> = ({value, setValue})=>(
    <Button title={`Add 1 : ${value}`} style={{backgroundColor:"red", color:"white"}}onClick={()=> setValue(value +1)} />
 );



function App() {
  const onListClick = useCallback((item: string) => {
    alert(item)
  }, [])

  // TYPING useState & useEffect
  // example - retrieving a payload from the backend.  Can either be null or the payload
  const [payload, setPayload] = useState<Payload | null>(null)

  useEffect(() => {
    fetch("/data.json")
      .then(resp => resp.json())
      .then(data => {
        setPayload(data.text)
      })
  }, [])

  // TYPING useReducer
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType): Todo[] => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          }
        ]
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id)
      default:
        throw new Error("Action Type must be 'ADD' or 'REMOVE'")
    }
  }, [])

  // useRef
  const newTodoRef = useRef<HTMLInputElement>(null);
  // useCallback
  const onAddTodo = useCallback(() => {
    // to solve "Object is possibly 'null'." error
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value
      })
      newTodoRef.current.value = ""
    }
  }, [])

  // Prop drilling useState
  // const [value, setValue]= useState(0)
  const [value, setValue]= useNumber(0)


  return (
    <div>
      <Heading title="Introduction" />
      <Box>
        Hello World
      </Box>
      <List items={["Evelyn", "Denis", "Elizabeth", "Hilary"]} onClick={onListClick}></List>
      <Box>{JSON.stringify(payload)}</Box>
      <Heading title="TODOs (useReducer)" />
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}
          <Button style={{backgroundColor:"blanchedAlmond", color:"black"}} onClick={() => dispatch({
            type: "REMOVE",
            id: todo.id
          })}
          >
            Remove
          </Button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <Button title="Add a todo" style={{backgroundColor:"purple", color:"gold"}} onClick={onAddTodo}/>
      </div>
      <Heading title="Prop Drilling" />
      <Incrementer value={value} setValue={setValue}/>
    </div>

  );
}

export default App;
