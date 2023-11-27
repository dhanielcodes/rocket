/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ConfigProvider,
  Radio,
  Pagination,
  DatePicker,
  TimePicker,
  Popconfirm,
  Button,
  Modal,
} from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { IntlProvider } from 'react-intl';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 5 * 60 * 1000,
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ConfigProvider locale={enUS}>
    <QueryClientProvider client={queryClient}>
    <IntlProvider locale="en">
       <App />
    </IntlProvider>
    </QueryClientProvider>

     </ConfigProvider>
    
  </React.StrictMode>,
)
