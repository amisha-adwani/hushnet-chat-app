import React from 'react'
import ChatBox from '../components/ChatBox'

const Solo = ({handleClick,handleChange}) => {
  return (
    <div>
      <ChatBox handleClick={handleClick} handleChange={handleChange}/>
    </div>
  )
}

export default Solo
