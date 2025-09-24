import { Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AdminLayout />} />
    </Routes>
  )
}

export default App
