import { useState } from "react"

// ✅ Complete the custom hook below
function useToggle(initialValue = false) {
  // your code here
  const [isOn , setIsOn] = useState(initialValue)

  const toggle = () => setIsOn(prev => !prev)

   return [isOn, toggle]
}

export {useToggle}