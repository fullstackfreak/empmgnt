import RegisterForm from "./RegisterForm";
import { Routes, Route } from 'react-router';
import LoginForm from './LoginForm'
import About from "./About";


function App() {
  return (
             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">    
    <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/about" element={<About />} />
         </Routes>

    

//     {/* <RegisterForm /> */}   </div>
  );
}

export default App;
