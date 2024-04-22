import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { SocketContext, socket } from './context/socketContext.js'

import RootLayout from '../layouts/RootLayout.jsx'

import SignInPage from '../routes/sign-in';
import SignUpPage from '../routes/sign-up.jsx'
import IndexPage from '../routes/index';
import Parameters from '../components/Parameters.jsx'
import GameBoard from '../components/GameBoard.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="params" element={<Parameters />} />
            <Route path="gameboard">
              <Route path=":roomId" element={<GameBoard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  </React.StrictMode>,
)
