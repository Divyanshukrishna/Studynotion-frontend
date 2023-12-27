/*function Navbar1(){
    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const {totalitems}=useSelector((state)=>state.cart)
    const location = uselocation()
    const [sublinks,setsublinks] = useState([])
    const [loading,setloading]=useState(false)
    useEffect(()=>{
        (async()=>{
            setloading(true)
            try{
                const res=await apiConnector("GET",categories.CATEGORIES_API)
                setsublinks(res.data.data)

            }
            catch(error){
                console.log("couldnot fetch categories",error)
            }
            setloading(false)
        })()
    },[])

    const matchroute = (route)=>{
        return matchpath({path:route},location.pathname)
    }
}
return (
  <div
  className={`flex h-14 items-center justify-center border-b-[1px] border-b-slate-800 ${
    loaction.pathname !== "/"? "bg-slate-900":""
  } transition-allduration-2005`}>
    <div className="flex w-11/12 max-w-maxcontent items-center justify-between">

    </div>

  </div>
)
export default Navbar*/

import React, { useState } from "react";
import "./navbar.css";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav">
      <a href="#" className="nav__brand">
        Studynotion
      </a>
      <ul className={active}>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Home
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            About
          </a>
        </li>
        <li className="nav__item">
          <a href="/Contact" className="nav__link">
            Contact
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
