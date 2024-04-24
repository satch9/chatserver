import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { SocketContext, socket } from './context/socketContext.js'
import { ChatProvider } from './context/chatContext.jsx'
import { Provider } from 'react-redux'
import store from './redux/store'

import RootLayout from './layouts/RootLayout.jsx'

import SignInPage from './routes/sign-in.jsx';
import SignUpPage from './routes/sign-up.jsx'
import IndexPage from './routes/index.jsx';
import Parameters from './components/game/Parameters.jsx'
import GameBoard from './components/game/GameBoard.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <ChatProvider>
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
        </ChatProvider>
      </Provider>
    </SocketContext.Provider>
  </React.StrictMode>,
)
