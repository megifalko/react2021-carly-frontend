import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../components/utils/NavigationBar'

const Layout = () => {
    return (
        <>
            <NavigationBar/>
            <Outlet/>
        </>
    )
}

export default Layout
