import React from 'react'
import UserRegister from '../Components/UserRegister'
import UserFooter from '../Components/Layouts/UserFooter'
import UserHeader from '../Components/Layouts/UserHeader'

const UserRegisterPage = () => {
  return (
    <>
    <UserHeader/>
      <UserRegister/>
      <UserFooter />
    </>
  )
}

export default UserRegisterPage
