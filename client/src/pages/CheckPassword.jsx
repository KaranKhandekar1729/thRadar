import { useState } from "react"

export default function CheckPassword() {
    const [password, setPassword] = useState('')
    const [strength, setStrength] = useState(null)
    const [checked, setChecked] = useState(false)
    const baseUrl = import.meta.env.VITE_BASE_URL
    
    const checkPassword = async () => {
        try {
            const response = await fetch(`${baseUrl}/check-password`, {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ password })
            })
            const data = await response.json();
            setStrength(data.result)
            setChecked(true)
        } catch (error) {
            console.error(error)
            setStrength(false)
            setChecked(true)
        }
        
    }

    return (
        <div>
            <h1 className="text-6xl font-semibold mb-4">Worried about password leaks?</h1>
            <h3 className="text-xl mb-8">check from a large set of passwords exposed in data breaches</h3>

            <input
                type="password"
                placeholder="Enter the password to be checked here"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="p-3 text-black rounded-lg w-4/12"
                autoCorrect="false"
                autoComplete="false"
                spellCheck="false"
            />
            <button
                disabled={password.length > 0 ? false : true}
                onClick={checkPassword}
                className="ml-2 p-3 bg-white text-black rounded-lg"
            >
                Check
            </button>
            { checked && (
                <div className="mt-4">
                    { strength ? (
                        <div className="text-green-400">
                            You're good to go! Your password was not found in a data breach
                        </div>
                    ) : (
                        <div className="text-red-400">
                            Please change your password! It was found in a previous data breach
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}