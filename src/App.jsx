
import './App.css'
import Human from './components/Human'
import Premium from './components/Premium';
import { Route, Routes } from 'react-router'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Human />} />
      <Route path="/premium" element={<Premium />} />
    </Routes>
    </>
  )
}

export default App
