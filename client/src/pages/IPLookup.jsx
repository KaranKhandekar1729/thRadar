import Globe from "../components/ui/Globe.jsx"
import rawPointsData from '../../public/ips_with_geolocation.json'
import { useState, useRef } from "react"
import { X, CircleAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function IPLookup() {
    const [openModal, setModalOpen] = useState(false)
    const [ip, setIP] = useState('')
    const [geoData, setGeoData] = useState(null)
    let globeAPI = useRef(null)
    const navigate = useNavigate()

    const baseUrl = import.meta.env.VITE_BASE_URL

    const checkIP = function () {
        navigate(`/ip-lookup/result?ip=${ip}`)
    }

    const rotateToIPLocation = async () => {
        const response = await fetch(`${baseUrl}/ip2loc?ip=${ip}`)
        const { geoData } = await response.json()
        setGeoData(geoData)
        if (geoData && globeAPI) {
            globeAPI.current.rotateToLatLng(geoData.latitude, geoData.longitude)
        }
    }

    const showOnGlobe = () => {
        if (globeAPI) {
            globeAPI.rotateToLatLng(geoData.latitude, geoData.langitude)
        }
    }

    return (
        <div className="relative flex flex-col w-full min-h-screen bg-black">
            <header className="relative z-20 flex flex-col items-center px-6 py-4">
                <div className="absolute top-36">
                    <h1 className="text-5xl font-semibold mb-4">Thousands of IPs are blacklisted each day</h1>
                    <h3 className="text-xl mb-8">Found a suspicious one? Check if it has been<br></br> reported before and associated with malicious activity!</h3>

                    <input
                        type="text"
                        placeholder="Enter the IP to be checked here"
                        value={ip}
                        onChange={e => setIP(e.target.value)}
                        className="p-3 text-white rounded-lg w-4/12 bg-[#000800] border-solid border-2 border-[#003366] "
                        autoCorrect="false"
                        autoComplete="false"
                        spellCheck="false"
                    />
                    <button
                        onClick={checkIP}
                        className="ml-2 p-3 bg-[#003366] text-white rounded-lg"
                    >
                        Check
                    </button>
                    <button
                        onClick={rotateToIPLocation}
                        className="ml-2 p-3 bg-[#003366] text-white rounded-lg"
                    >
                        Locate on globe
                    </button>

                </div>
            </header>
            <button onClick={() => setModalOpen(true)} className="text-white absolute top-5 right-10">
                <CircleAlert size={24} />
            </button>


            <main className="flex-1 flex items-center justify-center">
                <Globe pointData={rawPointsData} render="points" padding="true" onReady={(api) => { globeAPI.current = api }} />
            </main>

            {openModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="relative bg-black border-[1px] border-gray-700 rounded-xl p-6 w-11/12 max-w-lg">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <X size="20" />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-white">
                            About
                        </h2>
                        <div className="text-white text-left max-h-[70vh] overflow-y-auto">
                            <p className="mb-3">
                                Explore, locate, and understand the global distribution of malicious IP addresses with our interactive 3D globe. Our website visualizes over <strong>10,000 malicious IPs daily</strong>, giving you a real-time picture of cyber threats worldwide.
                            </p>
                            <p className="mb-3">
                                Simply enter an IP address, and with the <strong>“Locate on Globe”</strong> feature, the globe rotates to its coordinates, showing exactly where that IP originates. The live feed ensures you're seeing the most current threat landscape, keeping you informed about emerging risks as they appear.
                            </p>
                            <h3 className="font-semibold mb-2 text-indigo-400">Why Knowing Malicious IPs Matters:</h3>
                            <ul className="list-disc list-inside mb-3">
                                <li>Prevent unauthorized access to your systems</li>
                                <li>Stop fraud, spam, and DDoS attacks</li>
                                <li>Help security teams respond faster and more efficiently</li>
                            </ul>
                            <p>
                                Historically, large-scale botnets, phishing campaigns, and ransomware outbreaks have highlighted the importance of real-time IP intelligence. By seeing live threats on a 3D globe, you gain a spatial understanding of attacks and can act proactively to protect your network.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
