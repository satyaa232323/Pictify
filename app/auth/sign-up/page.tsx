import React from 'react'
import { SignUp } from '@clerk/nextjs'
const SignUpPage = () => {
  return (
    <div>
      <SignUp routing="hash"/>
    </div>
  )
}

export default SignUpPage
