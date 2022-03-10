import "./assets/styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoPage from './pages/todo';
import BandPage from "./pages/band";
import Navbar from "./components/Navbar/Navbar";
import TourPage from "./pages/tour";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/404";
import HalamanBandMember from "./pages/band-member";
import ProductPage from "./pages/products";
import UsersPage from "./pages/users";
import LoginPage from "./pages/login";
import CounterPage from "./pages/counter";

const data = [
  {
    username: "mark",
    location: "BSD",
    numberOfLikes: 120,
    caption: "Halo kawan-kawan!"
  },
  {
    username: "seto",
    location: "Jakarta",
    numberOfLikes: 3,
    caption: "Lagi overload kerjaan banget, mental health aku parah nih"
  },
  {
    username: "bill",
    location: "Puncak",
    numberOfLikes: 314,
    caption: "Kacau, macet banget!"
  },
]

function App() {
  const [myUsername, setMyUsername] = useState("seto");
  const [fullName, setFullName] = useState("")
  const [todoList, setTodoList] = useState([
    {
      date: new Date(),
      action: "Belajar Fundamental",
      isDone: true
    },
    {
      date: new Date(),
      action: "Beli coklat buat ayang",
      isDone: true
    },
    {
      date: new Date(),
      action: "Cicil project frontend",
      isDone: false
    },
    {
      date: new Date(),
      action: "Design project",
      isDone: false
    },
    {
      date: new Date(),
      action: "Bikin component library",
      isDone: true
    },
  ])
  
  const renderContentList = () => {
    const jsxResult = data.map((val) => {
      return (
        <ContentCard
          username={val.username}
          location={val.location}
          numberOfLikes={val.numberOfLikes}
          caption={val.caption}
        />
      )
    })

    return jsxResult
  }

  const renderTodoList = () => {
    return todoList.map((val, idx) => {
      return (
        <TodoItem
          date={val.date}
          action={val.action}
          isDone={val.isDone}
          deleteItem={() => deleteTodoItem(idx)}
          toggleStatus={() => toggleTodoStatus(idx)}
        />
      )
    })
  }

  const changeUsername = () => {
    setMyUsername("mark")
    setFullName("jane bar")
  }
  
  const [inputValues, setInputValues] = useState({
    todoInput: "",
    dateInput: "",
  })

  const inputHandler = (event) => {
    const { value, name } = event.target;

    setInputValues(
      {
        ...inputValues,
        [name]: value
      }
    )
  }

  const addTodoItem = () => {
    const newTodoArray = [...todoList]

    newTodoArray.push({
      date: inputValues.dateInput,
      action: inputValues.todoInput,
      isDone: false
    })

    setTodoList(newTodoArray)
  }

  const deleteTodoItem = (index) => {
    const deleteTodoArray = [...todoList]

    deleteTodoArray.splice(index, 1)

    setTodoList(deleteTodoArray)
  }

  const toggleTodoStatus = (index) => {
    const duplicateTodoArray = [...todoList]

    duplicateTodoArray[index].isDone = !duplicateTodoArray[index].isDone

    setTodoList(duplicateTodoArray)
  }

  const fetchToDoList = () => {
    axios.get("http://localhost:2000/todos")
    .then((res) => {
      console.log(res.data)
    })
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="container">
        <div className='row my-3'>
          <div className='offset-3 col-5'>
            <Input name='todoInput' onChange={inputHandler} />
            <Input name='dateInput' onChange={inputHandler} type='date' />

          </div>
          <div className='col-2'>
            <Button onClick={addTodoItem} color='success'>Add Todo</Button>
            <Button onClick={fetchToDoList} color='info'>Fetch Todo</Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
            {/* {renderContentList()} */}
            {renderTodoList()}
          </div>
        </div>
        <h1>{myUsername}</h1>
        <h1>{fullName}</h1>
        <Button onClick={changeUsername}>Change username</Button>
      </div>
      {/* <BandSection />
      <TourSection />
      <ClassComponent /> */}
    </>
  );
}

export default App;
