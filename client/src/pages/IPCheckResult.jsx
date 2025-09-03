import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { ArrowLeft, AlertCircle, X } from "lucide-react";

export default function ResultsPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const ip = params.get("ip")

    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [modalOpen, setModalOpen] = useState(false)

    const CATEGORY_MAP = {
        1: "DNS Compromise: Altering DNS records resulting in improper redirection.",
        2: "DNS Poisoning: Falsifying domain server cache (cache poisoning).",
        3: "Fraud Orders: Fraudulent orders.",
        4: "DDoS Attack: Participating in distributed denial-of-service (usually part of botnet).",
        5: "FTP Brute-Force",
        6: "Ping of Death: Oversized IP packet.",
        7: "Phishing: Phishing websites and/or email.",
        8: "Fraud VOIP",
        9: "Open Proxy: Open proxy, open relay, or Tor exit node.",
        10: "Web Spam: Comment/forum spam, HTTP referer spam, or other CMS spam.",
        11: "Email Spam: Spam email content, infected attachments, and phishing emails.",
        12: "Blog Spam: CMS blog comment spam.",
        13: "VPN IP: Conjunctive category.",
        14: "Port Scan: Scanning for open ports and vulnerable services.",
        15: "Hacking",
        16: "SQL Injection: Attempts at SQL injection.",
        17: "Spoofing: Email sender spoofing.",
        18: "Brute-Force: Credential brute-force attacks on webpage logins and services like SSH, FTP, SIP, SMTP, RDP, etc.",
        19: "Bad Web Bot: Webpage scraping (for email addresses, content, etc) and crawlers that do not honor robots.txt. Excessive requests and user agent spoofing can also be reported here.",
        20: "Exploited Host: Host is likely infected with malware and being used for other attacks or to host malicious content. The host owner may not be aware of the compromise.",
        21: "Web App Attack: Attempts to probe for or exploit installed web applications such as a CMS like WordPress/Drupal, e-commerce solutions, forum software, phpMyAdmin and various other software plugins/solutions",
        22: "SSH: Secure Shell (SSH) abuse.",
        23: "IoT Targeted: Abuse was targeted at an 'Internet of Things' type device."
    };

    useEffect(() => {
        if (!ip) return;
        fetch(`http://localhost:3000/ipcheck?ip=${ip}`)
            .then(r => r.json())
            .then(data => {
                console.log(data)
                setData(data.ipData)
            })
            .catch(err => console.error(err));
    }, [ip])

    if (!data) return <p className="text-white p-6">Loading data for {ip}...</p>;

    const reportsPerPage = 5
    const reports = data.reports || [];
    const totalPages = Math.ceil(reports.length / reportsPerPage)
    const start = (page - 1) * reportsPerPage
    const currentReports = reports.slice(start, start + reportsPerPage)

    return (
        <div className="relative text-white w-full h-full py-2">
            <main>
            <div className="flex justify-between">
                <Link to="/ip-lookup">
                    <p className="p-3 flex flex-row gap-2 m-auto">
                        <ArrowLeft size="20" className='flex my-auto' />
                    </p>
                </Link>
                <button onClick={() => setModalOpen(true)} className="p-3 pr-4">
                    <AlertCircle size="20" className='flex mx-auto' />
                </button>
            </div>
                <header className="mb-8">
                    <h1 className="text-4xl font-semibold mb-2">
                        IP Address {data.ipAddress} found{" "}
                        <span className="text-red-500">malicious!</span>
                    </h1>
                    <p className="text-xl">
                        Found{" "}
                        <span className="text-red-400">{data.totalReports} {" "}
                            {reports.length > 1 ? "reports" : "report"}
                        </span>
                        {" "}registered by <span className="text-red-400">{data.numDistinctUsers} distinct reporters</span>
                    </p>
                </header>

                <section className="flex align-middle m-auto px-8 mb-8 text-white text-balance max-w-5xl">
                    <p className="text-lg">
                        The IP address <span className="font-semibold">{data.ipAddress}</span> from <span className="font-semibold">{data.countryName} ({data.countryCode})</span> is provided by <span className="font-semibold">{data.isp}</span> and has an abuse score of <span className="font-semibold">{data.abuseConfidenceScore}%</span>. It was last reported on <span className="font-semibold">{new Date(data.lastReportedAt).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric"
                        })}</span>.
                    </p>
                </section>
                <section className="rounded-sm p-6 w-full mx-auto select-none">
                    <div className="overflow-y-auto max-h-[300px] scrollbar-thin">
                        <table className="border-collapse w-full text-left">
                            <thead className="sticky top-0 bg-gray-900 z-10">
                                <tr className="border-b border-gray-700 text-gray-300">
                                    <th className="p-3">Reported At</th>
                                    <th className="p-3">Comment</th>
                                    <th className="p-3">Reporter</th>
                                    <th className="p-3">Categories</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentReports.map((report, index) => (
                                    <tr key={index} className="border-b border-gray-800">
                                        <td className="p-3 w-2/12">
                                            {new Date(report.reportedAt).toLocaleDateString("en-US", {
                                                month: "2-digit",
                                                day: "2-digit",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="p-3 w-7/12 max-h-16 break-all text-ellipsis">
                                            {report.comment}
                                        </td>
                                        <td className="p-3 w-2/12">{report.reporterCountryName}</td>
                                        <td className="p-3 w-1/6">{report.categories.join(", ")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-4 select-none">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-gray-400">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </section>
            </main>
            {modalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="relative bg-black/90 border-[1px] border-gray-700 rounded-xl p-6 w-max max-w-3xl max-h-[80vh] overflow-y-auto scrollbar-thin">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-white text-center">Category Details</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse text-left text-white">
                                <thead>
                                    <tr className="border-b border-gray-700 bg-gray-900">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(CATEGORY_MAP).map(([id, desc]) => (
                                        <tr key={id} className="border-b border-gray-700 hover:bg-gray-800/50">
                                            <td className="p-3 font-semibold">{id}</td>
                                            <td className="p-3">{desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
