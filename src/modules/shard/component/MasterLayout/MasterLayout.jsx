import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Sidebar from "../Sidebar/SideBar";


export default function MasterLayout() {
  return (
    <>
    <div className="container-fluid">
      <div className="row"> 

        <div className="col-md-3 bg-danger">
          <Sidebar/>
        </div>
        <div className="col-md-9 bg-warning">
          <NavBar/>
          <Outlet/>

        </div>
        
      </div>

    </div>
    </>
  )
}
