import React from 'react'
import { useState, useRef } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';


export default function Login() {

    
    const { token, setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    
    const Submit = (e) =>{
        e.preventDefault();

        setLoading(true);

        const form = {
            email: emailRef.current.value, 
            password: passwordRef.current.value,
        }
        
        
        /*axiosClient.get('/sanctum/csrf-cookie').then(() =>{
            axiosClient.post("/api/login", form)
            .then(({ data }) =>{
                console.log("NAVIGATING...");
                console.log("TOKEN : ",token);
                setUser(data.user);
                setToken(data.token);
                //localStorage.setItem("ACCESS_TOKEN", data.token);
                navigate("/")
                
            })/*.catch(err =>{
                const response = err.response;
                if(response && response.status === 422){
                    //console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            })*******
           .catch(err => {
                if (err.response && err.response.status === 422) {
                    setErrors(err.response.data.errors);
                }
                if (err.response && err.response.status === 401) {
                    setErrors({ email: ["email or password Invalid"] });
                }
            });
        });*/

       
        axiosClient.post("/api/login", form)
        .then(({ data }) =>{
            //console.log("LOGIN RESPONSE:", data); 
            setUser(data.user);
            setToken(data.token);
            
            if (data.user.user_type == 1) {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        })
        .catch(err => {
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
            }
            if (err.response && err.response.status === 401) {
                setErrors({ email: ["email or password Invalid"] });
            }
        })
        .finally(() => {
            setLoading(false); // 🔥 stop loader
        });
        
    }

  return (
    <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to='/'><img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" className="mx-auto h-10 w-auto" /></Link>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={Submit} className="space-y-6">
                    <div>{errors.email && (<p className="text-red-600 text-sm text-center">{errors.email} </p>)}</div>
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input ref={emailRef} id="email" type="email" name="email" required autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div>
                    </div>
                    <div className="mt-2 relative">
                    <input ref={passwordRef} id="password" type={showPassword ? "text" : "password"} name="password" required autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                        >
                            {showPassword ? (
                            // Eye OFF
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-10-7a9.956 9.956 0 012.293-3.95M6.18 6.18A9.956 9.956 0 0112 5c5 0 9 4 10 7a9.96 9.96 0 01-4.293 5.05M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
                            </svg>
                            ) : (
                            // Eye ON
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            )}
                        </button>  
                    </div>
                    
                </div>

                <div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-500"}`}
                        > {loading ? "Signing in ...": "Sign in"}
                    </button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-blue-500 ">
                    <Link to={'/register'} className="underline underline-offset-1">I don't have account ?</Link>                    
                </p>
            </div>
        </div>    

    </>
  )
}
