import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from '../Context';
import axios from 'axios'
import { CSVLink } from "react-csv";


var uniqid = require('uniqid');

const Animation = posed.div(
    {
        visible: {opacity:1,
            applyAtStart : {display:"block"}},
        
        hidden: {opacity:0,
            applyAtEnd:{display:"none"}}
        
    }
)

 class AddUser extends Component {
     constructor(props){
         super(props)
         var today = new Date(),
         date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()+' '+today.getHours()+':'+today.getMinutes();
         this.state ={
            visible: true,
            date:date,
            ad:"",
            soyad:"",
            phone:"",
            mail:""
        }

     }

     change_visibility = (e)=>{
        this.setState({
            visible: !this.state.visible
        })
    }
    changeInput = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    addUser = (dispatch,e)=>{
        e.preventDefault()
        const {ad,soyad,phone,mail,date} = this.state
        const newUser = {
            id: uniqid(),
            date,
            ad,
            soyad,
            phone,
            mail
        }
        dispatch({
            type: "ADD_USER",
            payload: newUser
        })
        axios.post(`http://localhost:3004/users/`, {
            id : uniqid(),
            ad :this.state.ad,
            soyad :this.state.soyad,
            phone:this.state.phone,
            mail : this.state.mail,
            date:this.state.date
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    } 
      
    
    render() {
        const {visible,ad,soyad,phone,mail} = this.state
        const data = [{ad,soyad,phone,mail}]
        return <UserConsumer>
            {
                value =>{
                    const {dispatch} = value
                    return (
                        <div className="mb-4">
                            <button onClick ={this.change_visibility} className="btn btn-dark btn-block mb-2 mr-2">{visible ? "Hide Form" : "Show form"}</button>
                            <CSVLink data={data} style={{marginLeft:20}} filename={"list-app.csv"}
                                className="btn btn-dark btn-block mb-2 mr-2">
                                Download CSV
                                </CSVLink>
                            <Animation pose = {this.state.visible ? "visible" : "hidden"}>
                            <div className="card">
                                <div className="card-header">
                                    <h4>Add User</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.addUser.bind(this,dispatch)}>
                                        <div className="form-group">
                                            <label htmlFor="ad">Name</label>
                                            <input type="text" name="ad" id="id" placeholder="Enter name" className="form-control" value={ad} onChange={this.changeInput}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="soyad">Surname</label>
                                            <input type="text" name="soyad" id="soyad" placeholder="Enter surname" className="form-control" value={soyad} onChange={this.changeInput}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="text" name="phone" id="phone" placeholder="Enter phone" className="form-control" value={phone} onChange={this.changeInput}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="mail">Mail</label>
                                            <input type="text" name="mail" id="mail" placeholder="Enter mail" className="form-control" value={mail} onChange={this.changeInput}/>
                                        </div>
                                        <button className="btn btn-danger btn-block mt-3" type="submit">Add user</button>
                                    </form>
                                </div>
                            </div>
                            </Animation>
                        </div>
                    )
                }
            }
        </UserConsumer>
        
    }
}


export default AddUser 
