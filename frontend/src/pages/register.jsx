import React from 'react'
import { useState, useRef } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';


export default function Register() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

 
    const Submit = (e) =>{
        e.preventDefault();

        const form = {
            name: nameRef.current.value, 
            email: emailRef.current.value, 
            password: passwordRef.current.value,
        }
        
        
        //axiosClient.get('/sanctum/csrf-cookie').then(() =>{
            axiosClient.post("/api/register", form)
            .then(({data}) =>{
                setSuccess("Account created successfully ");
                setUser(data.user);
                setToken(data.token);

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
                
            }).catch(err =>{
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors);
                }
            })
        //});
    }
  return (
    <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to='/'><img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" className="mx-auto h-10 w-auto" /></Link>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {success && (
                    <div className="mb-4 text-green-600 text-center font-medium">
                        {success}
                    </div>
                )}
                <form onSubmit={Submit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Name</label>
                    <div className="mt-2">
                    <input id="name" type="text" ref={nameRef} name="text" required autoComplete="name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input id="email" type="email" ref={emailRef} name="email" required autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <div>{errors.email && (<p className="text-red-500 text-sm">{errors.email[0]} </p>)}</div>                    
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                   
                    </div>
                    <div className="mt-2">
                    <input id="password" type="password" ref={passwordRef} name="password" required autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-blue-500 ">
                <Link to={'/login'} className="underline underline-offset-1">I have an account</Link>                    
                </p>
            </div>
        </div>
    </>
  )
}
