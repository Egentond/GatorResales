import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";

export default function Login() {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await axiosInstance.post("/login", formData);
            setSuccess("Logged in successfully!");
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred.");
        };
            console.log("Login data:", formData);
        };

    return (
        <>
        <Menu />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-bold text-gray-800">Login to Your Account</h2>
                
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                            required
                            />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-gatorsBlue focus:border-gatorsBlue"
                            required
                            />
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-gatorsBlue focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Login
                    </button>
                </form>
            </div>
        </div>
        <Footer />
        </>
    );
}
