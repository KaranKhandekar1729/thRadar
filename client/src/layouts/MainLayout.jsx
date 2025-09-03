import Sidebar from './Sidebar.jsx'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="font-radar bg-black text-white flex flex-row w-screen h-screen overflow-hidden">
            <div className={`${isOpen ? "w-2/12" : "w-16"} transition-all duration-500`}>
                <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
            </div>        
            <div className="w-full h-screen bg-black flex flex-col align-middle text-center justify-center m-auto">
                <Outlet />
            </div>
        </div>
    )
}