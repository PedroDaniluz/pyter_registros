import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from "./pages/Register";
import OrderList from './pages/OrdersList';
import ProductManager from './pages/ProductManager';
import OrderView from './pages/OrderView';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/product-manager" element={<ProductManager />} />
        
        <Route path="/order/:id" element={<OrderView />} />
      </Routes>
    </>
  )
}

export default App
