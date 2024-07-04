// import React from 'react'

import Footer from "../../components/Footer/Footer"
import Nav from "../../components/Nav/Nav"
import HeaderShop from "./Structure/HeaderShop"
import MainShop from "./Structure/MainShop"



function Shop() {
  return (
    <>
      <Nav style="text-white"/>
      <HeaderShop/>
      <MainShop/>
      <Footer/>
      <a href="https://wa.me/+5491161000622?text=Hola%2C%20estoy%20interesado." target="_blank" className="w-[50px] h-[50px] 2xl:w-[70px] 2xl:h-[70px] cursor-pointer rounded-full bg-green-500 fixed bottom-4 right-5 flex justify-center items-center">
        <i className="bx bxl-whatsapp text-[50px] 2xl:text-7xl text-white"/>
      </a>
    </>
  )
}

export default Shop