"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { FormType } from '@/lib/utils/types';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const page = () => {

  const [error, setError] = useState<string>();
  const { register, handleSubmit } = useForm<FormType>();
  const router = useRouter();

  const signupFn = async (data: FormType) => {
    const response = await fetch("http://127.0.0.1:8000/api/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    if (!response.ok){
      setError(await response.json());
    }else{
      console.log(await response.json());
      router.push("/login");
    }
  }

  return (
    <main className='h-full  flex justify-center items-center bg-gradient-to-tr from-black via-slate-950 to-blue-950'>

      <div className='w-1/3 mt-2 p-6 rounded-md bg-white flex flex-col gap-2 justify-center items-center'>
        <h1 className='md:text-2xl text-xl font-bold text-gray-900 m-2'>Welcome to MLM SIGNUP_system</h1>
        <p className='text-red-500'>{error ? error : ""}</p>
        <form onSubmit={handleSubmit(signupFn)} className='h-1/2 flex flex-col gap-4 justify-center items-center'>

          <input className='rounded-md border p-1.5' type="text" placeholder='userName' {...register("user_name", {
            required: true
          })} />
          <input className='rounded-md border p-1.5' type="email" placeholder='userEmail' {...register("user_email", {
            required: true
          })} />
          <input className='rounded-md border p-1.5' type="password" placeholder='userPassword' {...register("user_password", {
            required: true,
            minLength: 6
          })} />
          <input className='rounded-md border p-1.5' type="text" placeholder="user_phone" {...register("user_phone", {
            required: true
          })} />
          <input className='rounded-md border p-1.5' type="text" placeholder="user_country" {...register("user_contry", {
            required: true
          })} />
            <input className='rounded-md border p-1.5' type="text" placeholder="user_city" {...register("user_city", {
            required: true
          })} />
            <input className='rounded-md border p-1.5' type="text" placeholder="user_pin" {...register("pin", {
            required: true
          })} />
            <input className='rounded-md border p-1.5' type="text" placeholder="user_Role" {...register("role", {
            required: true
          })} />
            <input className='rounded-md border p-1.5' type="text" placeholder="user_balance" {...register("balance", {
            required: true
          })} />
          <Button buttonType='submit'>
            Sign Up
          </Button>
        </form>

        <h1 className='md:text-xl text-gray-900 m-2'>
          Already have an account?
        </h1>
        <Link href={"/login"}>
          <Button buttonType='button'>
            Sign In
          </Button>
        </Link>
      </div>
    </main>
  )
}

export default page