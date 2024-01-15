import React, { useEffect } from 'react'
const Profile = ({ onChangeHeader }) => {
    useEffect(() => {
      // Example: Change the headerName based on some condition
      onChangeHeader("Profile");
    }, [onChangeHeader]);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export default Profile
