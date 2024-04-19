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
    </>
  )
}

export default Shop