import React, { Component} from 'react';
import UserConsumer from '../Context';
import posed from 'react-pose';
import axios from 'axios';
import EasyEdit, { Types } from "react-easy-edit";




const Animation = posed.div(
    {
        visible: {opacity:1,
            },
        
        hidden: {opacity:0,
            }
        
    }
)

export default class User extends Component {
    state = {
        visible: true
    }
    visible_checker = (e) =>{
        this.setState ({
            visible: !this.state.visible
        })
    }
    onDeleteUser = (dispatch,id,e)=>{
        dispatch({
            type: "DELETE_USER",
            payload: this.props.id
        })
        axios.delete(`http://localhost:3004/users/${this.props.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
  
        const users = this.state.users
        this.setState({ users });
      })
    } 

    
    render() {
        const {visible} = this.state
        
        return (<UserConsumer>
            {
                value => {
                    const {dispatch} = value
                    return (
                        <div className="card mb-3 mt-3" style={!visible ? {backgroundColor: "#62848d",color:"#fff"}:null}>
                            <h4 className="card-header d-flex align-items-center" style={{position:'relative'}}>
                            <EasyEdit
                            type={Types.TEXT}
                            value={this.props.ad}
                            onSave={val => alert("Submitted")}
                            /> 
                            <EasyEdit
                            type={Types.TEXT}
                            value={this.props.soyad}
                            onSave={val => alert("Submitted")}
                            />
                                <button onClick ={this.visible_checker} style={{marginLeft:'30px'}} className="info-btn btn btn-dark btn-block">{visible ? "Show more info" : "Hide more info"}</button>
                                <i onClick={this.onDeleteUser.bind(this,dispatch)} className="fa fa-trash-o" style={{position:'absolute',right:'50px',cursor:'pointer',color:'red'}}></i>
                                <span style={{marginLeft:'30px',fontWeight:200,fontSize:14}}>This contact was created on {this.props.date}</span>
                            </h4>
                            
                            
                            <Animation pose = {!this.state.visible ? "visible" : "hidden"}>
                            {
                                !this.state.visible ? <div className="card-body">
                                <p className="card-title">
                                   Phone: <EasyEdit
                            type={Types.TEXT}
                            value={this.props.phone}
                            onSave={val => alert("Submitted")}
                            />
                                </p>
                                <p className="card-text">Mail: <EasyEdit
                            type={Types.TEXT}
                            value={this.props.mail}
                            onSave={val => alert("Submitted")}
                            /></p>
                            </div> : null
                            }
                            </Animation>
                            
                        </div>
                    )
                }
            }
        </UserConsumer>)
    }
}
