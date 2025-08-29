import Sidebar from './Sidebar.jsx'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="bg-[#161616] text-white flex flex-row w-screen h-screen overflow-hidden">
            <div className={`${isOpen ? "w-2/12" : "w-16"} transition-all duration-500`}>
                <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
            </div>        
            <div className="w-full h-screen bg-[#0A0A0A] rounded-t-lg mt-2 mr-2 flex flex-col align-middle text-center justify-center m-auto">
                {/* <CheckUrl className="flex justify-center align-middle m-auto"></CheckUrl> */}
                <Outlet />
            </div>
        </div>
    )
}