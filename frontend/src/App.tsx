import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import CreatePassword from "./screens/CreatePassword"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="home" element={<HomeScreen />} />
          <Route path="/reset" element={<CreatePassword />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App