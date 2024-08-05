import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from "./modules/Authentication/components/Login/Login";
import Forgetpass from "./modules/Authentication/components/Forgetpass/Forgetpass";
import Home from './modules/Home/Components/Home/Home';
import AuthLayout from './modules/shard/component/AuthLayout/AuthLayout';
import NotFound from './modules/shard/component/NotFound/NotFound';
import Resetpass from './modules/Authentication/components/Resetpass/Resetpass';
import Register from './modules/Authentication/components/Register/Register';
import MasterLayout from './modules/shard/component/MasterLayout/MasterLayout';
import Recipeslist from './modules/Recipes/component/Recipeslist/Recipeslist';
import Categoireslist from './modules/Categoires/Components/Categoireslist/Categoireslist';
import Userlist from './modules/User/Components/Userlist/Userlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import {jwtDecode} from 'jwt-decode'
import ProtectedRoute from './modules/shard/component/ProtectedRoute/ProtectedRoute';



function App() {

  const [loginData , setloginData] = useState(null);

  let saveLoginData = () =>{
      let encodedToken = localStorage.getItem('token');
      let decodedToken = jwtDecode (encodedToken);
      saveLoginData(decodedToken)
  }

  const routes = createBrowserRouter ([
    {
          path:"",
          element: <AuthLayout/>,
          errorElement:<NotFound/>,
          children:[
          {index:true, element: <Login saveLoginData={saveLoginData} />},
          {path:"Login", element: <Login  saveLoginData={saveLoginData} /> },
          {path:"Forgetpass", element: <Forgetpass/> },
          {path:"Resetpass", element: <Resetpass/> },
          {path:"Register", element: <Register/> }
        ],


    },
    {
      path: "dashboard" ,
      element:  (<ProtectedRoute>
                <MasterLayout/>
                </ProtectedRoute>
                ),

                errorElement:<NotFound/>,
                children:[
                {index:true, element: <Home/>},
                {path:"hoom", element: <Home/> },
                {path:"recipesList", element: <Recipeslist/> },
                {path:"Categoireslist", element: <Categoireslist/>},
                {path:"Users", element: <Userlist/> },

      ],
    }

  ]);

  return (

    <>
    <ToastContainer/>
    <RouterProvider router={routes}/>
    </>
  );
}

export default App
