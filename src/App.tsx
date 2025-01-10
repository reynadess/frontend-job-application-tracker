import { Link, Route, Routes } from "react-router-dom"
import LoginPage from "./auth/LoginPage"
import SignupPage from "./auth/SignupPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>}></Route>
      </Routes>

      <h1 className="text-center p-5">Welcom  , to the job application tracker (Demo)<Link className="underline" to="/login">Login Page</Link></h1>
    </>
  )
}

export default App
