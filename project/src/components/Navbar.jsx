/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";


function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  
 
    
  function logout(){
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }

  

  return (
    <div>
      <nav class="navbar  navbar-expand-lg ">
      <a class="navbar-brand" href="/home">
    <img src="https://scontent.fcmb8-1.fna.fbcdn.net/v/t39.30808-6/300800079_443331807815756_8870031635736273898_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=V2C34Z9A_AYAX9wOJLA&_nc_ht=scontent.fcmb8-1.fna&oh=00_AfDHpunNvtXAYPVvTvGlyytyaZPflYfQ4XZbI2jINbn16g&oe=645BF5F5" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy"></img>
    DIYON BUNGALOW
  </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"><i class="fa fa-bars" style={{color : 'white'}}></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto mr-5">
          <li class="nav-item">
              <a class="nav-link" href="/nhome">
                Home
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/home">
               Accomandation
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/day">
               Dayout Packages
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/event">
                Events
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/restaurant">
                Dining
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/taxi">
               Taxi Services
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/tour">
              Tourist Destination
              </a>
            </li>
            

          <div class="dropdown">
                  <button
                    class="btn2 btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                  More
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    
                    <a class="dropdown-item" href="/inventory">
                    Inventory
                    </a>
          </div>
          </div>
         
            {user ? (
              <>
                <div class="dropdown">
                  <button
                    class="btn2 btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fa fa-user"></i> {user.name}
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="/profile">
                     Profile
                    </a>
                    <a class="dropdown-item" href="#" onClick={logout}>
                      Log Out
                    </a>
                    {user.isAdmin && 
                    <a class="dropdown-item" href="/admin" >
                     Admin panel(room)      
                    </a>
                      }
                       {user.isAdmin && 
                    <a class="dropdown-item" href="/adminday" >
                     Admin panel(day out)      
                    </a>
                      }
                      {user.isAdmin && 
                    <a class="dropdown-item" href="/dinning" >
                     Dinning(Admin)
                    </a>
                      }
                       {user.isAdmin && 
                    <a class="dropdown-item" href="/adminevent" >
                     Admin panel(event)      
                    </a>
                      }
                       {user.isAdmin && 
                    <a class="dropdown-item" href="/adminm" >
                     Admin panel(taxi)      
                    </a>
                      }
                      {user.isAdmin && 
                    <a class="dropdown-item" href="/admintour" >
                     Admin panel(taxi)      
                    </a>
                      }
                  </div>
                </div>
               
              </>
            ) : (
              <>
                <li class="nav-item">
                  <a class="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disable" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          

          </ul>
          
        </div>
      </nav>
    </div>

  );


}

export default Navbar;
