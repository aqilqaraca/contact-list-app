//----Created by Agil Garajayev----
// ----01/03/2021---- 
//note : start json-server (json-server --watch api/db.json)

import React, { Component } from 'react'
import Users from './components/Users'
import AddUser from './components/AddUser'


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
        <div className="NavBar pt-3 pb-3"><h2 style={{textAlign:'center'}}>Contact List App</h2></div>
        <AddUser/>
        <Users />
      </div>
      </div>
    )
  }
}
