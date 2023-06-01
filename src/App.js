import logo from './logo.svg';
import './App.css';
import ContextProvider from './app';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CallBox from './components/CallBox';
import Calllog from './components/Calllog';
import RegisterSIP from './components/RegisterSIP';
import Phoning from './components/CallBox/Phoning';
import Receiving from './components/CallBox/Receiving';
import Init from './components/Init';
import {isMobile} from "react-device-detect"
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Init />,
      children: [
        {
          path: '/',
          element: <CallBox />,
        },
        {
          path: '/calllog',
          element: <Calllog />,
        },
        {
          path: '/register',
          element: <RegisterSIP />,
        },
      ],
    },
  ]);
  return (
    <ContextProvider>
      <div className={`w-[400px] ${isMobile ? "h-screen" : "h-[600px]"} bg-[#673AB7] text-white`}>
        <RouterProvider router={router} />
      </div>
    </ContextProvider>
  );
}

export default App;
