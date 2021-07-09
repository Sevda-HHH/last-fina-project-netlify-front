import React from 'react'
import { Redirect } from 'react-router-dom'

interface IProps {
    children: any
}
export const ProtectedRouteAdmin: React.FC<IProps> = ({ children }): any => {
    const token = localStorage.getItem('token')

    if (token && JSON.parse(token).user.status === 'admin') {
        return children
    } else {
        return <Redirect to="/" />
    }

}
