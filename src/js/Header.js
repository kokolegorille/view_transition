import React from "react"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
    const viewNavigate = (newRoute) => {
      // Navigate to the new route
      if (!document.startViewTransition) {
        return navigate(newRoute)
      } else {
        return document.startViewTransition(() => {
          navigate(newRoute)
        })
      }
    }
    return (
        <div className="header__container">
        <span>ReactJs - React Router - View Transitions API</span>
        <div className="link__container">
            <button
            onClick={() => {
                viewNavigate("/")
            }}
            >
            Home
            </button>
            <button
            onClick={() => {
                viewNavigate("/download")
            }}
            >
            Download
            </button>
            <button
            onClick={() => {
                viewNavigate("/about")
            }}
            >
            About
            </button>
        </div>
        </div>
    )
}

export default Header