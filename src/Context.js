import React,{Component} from 'react'
import axios from 'axios';

const UserContet = React.createContext();
const reducer = (state,action) =>{
    switch(action.type){
        case "DELETE_USER":
            return{
                ...state,
                users: state.users.filter(user => action.payload !==user.id)

            }
        case "ADD_USER":
          return{
            ...state,
            users: [...state.users,action.payload]
          }
        
        default:
            return state
    }
}

export class UserProvide extends Component {
    state = {
        users:[
          
        ],
        dispatch: action =>{
            this.setState(state => reducer(state,action))
        }
      }
    
      componentDidMount = async() =>{
        const respone = await axios.get("http://localhost:3004/users")
        this.setState({
          users: respone.data
        })   
      }
    render() {
        return (
            <UserContet.Provider value={this.state}>
                {this.props.children}
            </UserContet.Provider>
        )
    }
}

const UserConsumer = UserContet.Consumer

export default UserConsumer
