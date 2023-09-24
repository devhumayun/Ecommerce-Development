import { useEffect, useRef, useState } from "react"

const useDropdownPopupControl = () => {
    const [ isOpen, setIsOpen ] = useState(false)
   
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const dropDownRef = useRef(null)

    const handleClickOutsite = (e) => {
        if( dropDownRef.current && !dropDownRef.current.contains(e.target)){
            setIsOpen(false)
        }
    }
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutsite)

        return () => {
            document.removeEventListener("click", handleClickOutsite)
        }
    }, [])

    return { isOpen, toggle, dropDownRef }
}

export default useDropdownPopupControl
