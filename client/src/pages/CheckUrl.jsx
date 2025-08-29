import { useState } from "react";

export default function CheckUrl() {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState(null);

    const checkUrl = async () => {
        const res = await fetch(`http://localhost:4000/check-url?url=${encodeURIComponent(url)}`)
        const data = await res.json()
        setResult(data)
        console.log("result: ", result)
    }
    return (
        <div>
            <h1 className="text-6xl font-semibold mb-4">Tired of phishy sites?</h1>
            <h3 className="text-xl mb-8">check whether an url is safe</h3>

            <input 
                type="text" 
                placeholder="Enter the url here"
                value={url}
                onChange={e => setUrl(e.target.value)} 
                className="p-3 text-black rounded-lg w-4/12" 
                autoCorrect="false" 
                autoComplete="false" 
                spellCheck="false" 
            />
            <button
                onClick={checkUrl}
                className="ml-2 p-3 bg-white text-black rounded-lg"
            >
                Check
            </button>
            { result && (
                <div className="mt-4">
                    { result.online ? (
                        <div>Your submission is currently online</div>
                    ) : (
                        <div>Your submission is currently offline</div>
                    )}
                    { result.verified ? (
                        <div className="text-red-500">
                            Phishing Detected - The URL is not safe!! 
                        </div>
                    ) : (
                        <div className="text-green-500">
                            Not Phishy - The URL is safe
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}