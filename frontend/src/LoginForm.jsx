import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router';

function LoginForm() {
  const [submitted, setSubmitted] = useState(false);
const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post("http://localhost:5000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.data.success){
        localStorage.setItem("token", response.data.token);
        // window.location.href = 'http://localhost:5174'; // 
        setSubmitted(true);
      }
    } catch (error) {
        console.log(error)
    }



  };

  return (
    <div className="
      w-full max-w-md mx-auto mt-10 
      p-6 rounded shadow 
      bg-gradient-to-br from-white via-blue-100 to-purple-100
    ">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Login
        </button>
      </form>


      {submitted && (
        <div className="mt-4 text-green-600 text-center">
          Login Success!
        </div>
      )}
    </div>
  );
}

export default LoginForm;
