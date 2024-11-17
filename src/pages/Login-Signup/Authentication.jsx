import React from "react"
import { useState } from "react"
import SignUp from "./SignUp"
import Login from "./Login"



function Authentication (){
  return (
    <div>
      <h1>Login forms</h1>
      <SignUp/>
      <Login/>
    </div>
  )
}


export default Authentication