import Globe from "../components/ui/Globe.jsx"
import rawArcData from '../../public/attacks.json'
import { CircleAlert, X } from "lucide-react"
import { useState } from "react"

export default function Page() {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <main className="relative flex w-full min-h-screen items-center justify-center bg-black">
            <button onClick={() => setModalOpen(true)} className="text-white absolute top-5 right-10 pb-20">
                <CircleAlert size={24} />
            </button>
            <Globe arcData={rawArcData} render="arcs"/>
            {modalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative bg-black rounded-2xl p-6 shadow-2xl border-[1px] border-gray-700 w-max max-w-3xl max-h-[80vh]">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-3 text-white/70 hover:text-white"
                        >
                            <X size="20" />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-white">
                            About
                        </h2>
                        <div className="text-white text-left max-h-[70vh] overflow-y-auto space-y-4">
                            <p>
                                Our interactive 3D globe showcases <strong>weekly traffic trends and attack spikes</strong> targeting Cloudflare networks, focusing exclusively on Layer 7 attacks. These attacks are complex, application-level threats that can overwhelm web applications and APIs.
                            </p>
                            <p>
                                Although Cloudflare handles massive traffic globally, we've isolated and visualized the <strong>top 100 attacks from last week</strong>, giving a clear picture of where attacks are originating and which networks are being targeted. The globe shows both the <strong>origin of the attack</strong> and the <strong>target within Cloudflares infrastructure</strong>, highlighting global attack patterns.
                            </p>
                            <h3 className="font-semibold text-indigo-400">Why This Matters:</h3>
                            <ul className="list-disc list-inside">
                                <li>Understand Layer 7 attack trends and spikes</li>
                                <li>Gain insights into threat geography and attack origin vs. target</li>
                                <li>Identify patterns that can help organizations prepare and respond faster</li>
                            </ul>
                            <p>
                                By visualizing these attacks, users can grasp the scale and nature of threats facing even massive infrastructures like Cloudflare. Awareness of origin-target dynamics empowers security teams and researchers to better anticipate risks and strategize defenses.
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </main>
    )
}