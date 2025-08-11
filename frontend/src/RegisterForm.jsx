import { useState } from "react";
import axios from 'axios';

function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
   // console.log(JSON.stringify(data));
    try {
      const response = await axios.post("http://localhost:5000", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.data.success){
        setSubmitted(true);
      }
    } catch (error) {
        console.log(error)
    }
    
  };

  return (
    <div
      className="
      w-full max-w-md mx-auto mt-10 
      p-6 rounded shadow 
      bg-gradient-to-br from-white via-blue-100 to-purple-100
    "
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4" method="post">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Register
        </button>
      </form>
      {submitted && (
        <div className="mt-4 text-green-600 text-center">
          Registration successful!
        </div>
      )}
      {/* <a href="/login">Login</a> */}
    </div>
  );
}

export default RegisterForm;
