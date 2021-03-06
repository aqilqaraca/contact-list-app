import React, { Component } from 'react'
import User from './User'
import UserConsumer from '../Context'

export default class Users extends Component {
    render() {
        return (
            <UserConsumer>
                {
                    value =>{
                        const {users} = value
                        return (
                            <div>
                               {
                                   users.map(user =>{
                                       return (
                                           <User
                                           date = {user.date} 
                                           key = {user.id}
                                           id = {user.id}
                                           ad = {user.ad}
                                            soyad = {user.soyad}
                                            phone={user.phone}
                                            mail={user.mail}
                                            data={user.ad}
                                             />
                                       )
                                   })
                               }
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}
