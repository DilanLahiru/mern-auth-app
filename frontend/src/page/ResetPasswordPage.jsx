import React, {useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { motion } from "framer-motion"
import Input from '../components/Input';
import {Loader, Lock} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const ResetPasswordPage = () => {

const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const navigate = useNavigate();
const {token} = useParams();

const {resetPassword, error, isLoading, message} = useAuthStore();

const handleResetPassword = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        toast.error("Password do not match")
        return;
    }
    try {
        await resetPassword(token, password);
        toast.success("Password reset successfully...")
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    } catch (error) {
        toast.error(error.message || "Error resetting password")
    }
  }

  return (
    <motion.div
      initial={{opacity:0, y:20}} 
      animate={{opacity:1, y:0}}
      transition={{duration:0.5}}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
     <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
            Reset Password
        </h2>
        <form onSubmit={handleResetPassword}>
          <Input
            icon={Lock}
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            icon={Lock}
            type='password'
            placeholder='Re-enter Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
        <motion.button
			className='mt-2 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
			font-bold rounded-lg shadow-lg hover:from-green-600
		  hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
		  focus:ring-offset-gray-900 transition duration-200'
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			type='submit'
		   >
            {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Set New Password"}
		</motion.button>
        </form>
     </div>   
    </motion.div>
  )
}

export default ResetPasswordPage;