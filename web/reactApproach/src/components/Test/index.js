import React, { useState } from 'react'

function Test() {
  const [state, setState] = useState(0);
  return (
    <div>
      <p>{state}</p>
      <button onClick={() => {
        setState(state + 1);
      }}>Increase me</button>
    </div>
  )
}

export default Test
