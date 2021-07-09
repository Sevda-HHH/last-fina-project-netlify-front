import React from 'react'
import { Redirect } from 'react-router-dom'

interface IProps {
    children: any
}
export const ProtectedRoute: React.FC<IProps> = ({ children }): any => {
    const token = localStorage.getItem('token')
    if (token) {
        return children
    } else {
        return <Redirect to="/login" />
    }

}
