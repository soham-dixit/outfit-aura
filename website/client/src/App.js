import Header from './components/header/Header';
import Home from './components/Home/Home';
import DetailView from './components/details/DetailView';
import Cart from './components/cart/Cart';
import { Box } from '@mui/material';

import DataProvider from './context/DataProvider';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import LoginDialog from './components/login/LoginDialog';
import ProtectedRoute from './ProtectedRoute';
import ProtectLogin from './ProtectLogin';
import Orders from './components/Orders/Orders';
import Chat from './components/chat/Chat';

function App() {

  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 65 }}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                // <ProtectLogin>
                  <LoginDialog />
                // </ProtectLogin>
                // <ProtectedRoute>
                //   <Chat />
                // </ProtectedRoute>
              }
            />
            <Route path="/home/product/:id" element={<DetailView />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
