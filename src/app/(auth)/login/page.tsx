"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import { FormType } from '@/lib/utils/types';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const page = () => {

  // let [formData, setFormData] = useState(new FormData())

  const [error, setError] = useState<string>();
  const { register, handleSubmit } = useForm<FormType>();
  const router = useRouter();

  const loginFn = async (data: FormType) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/signup/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setError(await response.json());
      } else {
        setError('');
        const responseData = await response.json(); // Store the response data

        const { access_token, refresh_token } = responseData;

        const access_expiration_time = new Date();
        access_expiration_time.setSeconds(access_expiration_time.getSeconds() + access_token.access_expiry_time);

          const refresh_exipration_time = new Date();
      refresh_exipration_time.setSeconds(refresh_exipration_time.getSeconds() + refresh_token.refresh_expiry_time);

        // Set the access token cookie
        setCookie('access_token', access_token.token, {
          expires: access_expiration_time,
          secure: true,
        });
          setCookie("refresh_token", refresh_token.token, {
        expires: refresh_exipration_time,
        secure: true
      });
        // Redirect to the desired page
        router.push('/');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <main className='h-screen flex justify-center items-center bg-gradient-to-tr from-black via-slate-950 to-blue-950'>

      <div className='w-1/3 p-6 rounded-md bg-white flex flex-col gap-2 justify-center items-center'>
        <h1 className='md:text-2xl text-xl font-bold text-gray-900 m-2'>MLM LOGIN_system</h1>
        <p className='text-red-500'>{error ? error : ""}</p>
        <form onSubmit={handleSubmit(loginFn)} className='flex flex-col gap-4 justify-center items-center'>
          {/* 
          <input className='rounded-md border  p-1.5' type="text" placeholder='userName'  {...register("user_name", {
            required: true,
            // pattern:"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          })} /> */}

          <input className='rounded-md border p-1.5' type="email" placeholder='userEmail' {...register("user_email", {
            required: true
          })} />
          <input className='rounded-md border p-1.5' type="password" placeholder='userPassword' {...register("user_password", {
            required: true,
            minLength: 6
          })} />
          <Button buttonType='submit'>
            Sign In
          </Button>
        </form>

        <h1 className='md:text-xl text-gray-900 m-2'>
          Don't have an account?
        </h1>
        <Link href={"/register"} className='w-3/5'>
          <Button buttonType='button'>
            Sign Up
          </Button>
        </Link>
      </div>
    </main>
  )
}

export default page