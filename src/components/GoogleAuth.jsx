import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// production key
// const clientId= "296055646871-h7t8vokik6beui0v8rc7rqarujaegbs4.apps.googleusercontent.com"
// test key
const clientId = '57460457748-ofaf6t0i86ab86l1qrii3pvs8liv9c45.apps.googleusercontent.com';
export default function GoogleAuth() {
  const navigate=useNavigate()
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <GoogleLogin 
      onSuccess={(credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
        
        navigate('/')
      }}
      onError={() => {
        console.log("Login failed");
      }}
    />
  </GoogleOAuthProvider>

  )
}
