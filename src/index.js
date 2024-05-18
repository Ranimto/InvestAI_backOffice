

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Form } from "react-router-dom";
import App from "App";
import { Provider } from 'react-redux';
import {store} from './store';
//  React Context Provider
import { MaterialUIControllerProvider } from "context";


const container = document.getElementById("app");
const root = createRoot(container);


root.render(
  
  <BrowserRouter>
  <Provider store={store}>
    <MaterialUIControllerProvider>
        <App />        
    </MaterialUIControllerProvider>
  </Provider>
  </BrowserRouter>
);
