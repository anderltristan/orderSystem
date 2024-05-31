import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { CartProvider } from './context/CartContext';
import { OrderHistory } from './pages/OrderHistory';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/menu" element={<Home />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
