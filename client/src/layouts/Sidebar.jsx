import { Link } from 'react-router-dom'
import { PanelLeft, Link as LinkIcon, LockKeyhole, EarthLock, MapPin } from 'lucide-react'

export default function Sidebar({ isOpen, toggle }) {
    return (
        <div className="bg-black border-r border-gray-700/60 h-screen flex flex-col text-white">
            <div className='flex flex-row pt-5'>
                <button onClick={toggle} title={`${isOpen ? "hide" : "show"}`} className={`${isOpen ? "ml-auto pr-4" : "m-auto"} flex mb-5`}>
                    {isOpen ? <PanelLeft size="20" color='#A0A0A0' /> : <PanelLeft size="20" color='#A0A0A0'/>}
                </button>
            </div>
            <div className={`${isOpen ? "p-4" : "mx-auto p-0"} flex flex-col align-middle gap-3 transition-all duration-400`}>
                <Link to="/url-lookup">
                    <p title={`${isOpen ?"" : "url lookup"}`} className={`${isOpen ? "p-2" : "p-3"} flex flex-row gap-2 m-auto hover:bg-[#3836369d] rounded-lg`}>
                        <LinkIcon size="20" className='flex my-auto' />
                        {isOpen && "URL Lookup"}
                    </p>
                </Link>
                <Link to="/password-lookup">
                    <p title='password lookup' className={`${isOpen ? "p-2" : "p-3"} flex flex-row gap-2 m-auto hover:bg-[#3836369d] rounded-lg`}>
                        <LockKeyhole size="20" className='flex my-auto' />
                        {isOpen && "Password Lookup"}
                    </p>
                </Link>
                <Link to="/live-ddos">
                    <p title={`${isOpen ?"" : "live ddos"}`} className={`${isOpen ? "p-2" : "p-3"} flex flex-row gap-2 m-auto hover:bg-[#3836369d] rounded-lg`}>
                        <EarthLock size="20" className='flex my-auto' />
                        {isOpen && "Live Ddos Map"}
                    </p>
                </Link>
                <Link to="/ip-lookup">
                    <p title={`${isOpen ?"" : "ip lookup"}`} className={`${isOpen ? "p-2" : "p-3"} flex flex-row gap-2 m-auto hover:bg-[#3836369d] rounded-lg`}>
                        <MapPin size="20" className='flex my-auto' />
                        {isOpen && "IP Lookup"}
                    </p>
                </Link>
            </div>
        </div>
    )
}