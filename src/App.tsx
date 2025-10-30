import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import Dashboard from './Pages/Dashboard/Dashboard'
import { TaskProvider } from './info/TaskInfo'
function App() {

  return (
    <TaskProvider>

    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>    
    </BrowserRouter>
    </TaskProvider>
  )
}

export default App
