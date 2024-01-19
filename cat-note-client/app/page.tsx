'use client'

import {useUser} from "@auth0/nextjs-auth0/client";
import {useRouter} from 'next/navigation'
import React, {useEffect} from "react";
import Image from 'next/image'
import {Roboto} from 'next/font/google'
import Kitty from './public/kitty.png'
import './page.scss';
import ButtonVariant from "@/app/components/ui-components/button/buttonVariant";

const roboto = Roboto({
  weight: '500',
  subsets: ['latin'],
})

export default function Home() {
  const router = useRouter();
  const {user} = useUser();

  useEffect(() => {
    const getCheckUser = async () => {
      await handleGetUser();
    }

    if (user) {
      getCheckUser();
    }
  }, [user])

  const handleGetUser = async () => {
    await fetch("api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userName: user!.email})
    })
      .then(async (res) => {
        const userResponse = await res.json();

        if (userResponse){
          localStorage.setItem("targetUserId", userResponse.id);
          localStorage.setItem("isAdmin", userResponse.isAdmin);
          handleRouter();
        }
      })
  }

  const handleRouter = () => {
    router.push("/tasks")
  }

  return (
    <div className="loginPage">
      <div className="loginPage__content">
        <Image src={Kitty} alt="Picture of the author"/>
        <div className="loginPage__block">

          <div className="loginPage__block__header">
            <div className="loginPage__block__header__leftCircle"></div>
            <div className={`${roboto.className} loginPage__block__textWelcome`}>
              Welcome to Cat Note!
            </div>
            <div className="loginPage__block__header__rightCircle"></div>
          </div>

          {user == null
            ? <div className="loginPage__block__button">
              <ButtonVariant route="/api/auth/login" variant="outlined" text="Login"/>
            </div>
            : <div className="loginPage__block__button">
              <ButtonVariant route="/api/auth/logout" variant="outlined" text="Logout"/>
            </div>}
        </div>
      </div>
    </div>
  )
}
