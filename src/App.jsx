import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from "./pages/Register";
import OrderList from './pages/OrdersList';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-list" element={<OrderList />} />
      </Routes>
    </>
  )
}

export default App
