import { useState } from "react";


const useFormFields = (initialState) => {
    const [input, setInput] = useState(initialState);
    
      const handleInputChange = (e) => {
        setInput((preState) => ({
          ...preState,
          [e.target.name]: e.target.value,
        }));
      };

    const formEmpty = () => {
        setInput(initialState)
    }
  
    return {input, handleInputChange, formEmpty, setInput}
}

export default useFormFields
