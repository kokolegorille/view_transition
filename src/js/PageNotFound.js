import React from "react"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <main className="main__container">
            <h1>
                <span>404</span>
            </h1>
            <div>
                <button
                    style={{ width: 200 }}
                    onClick={() => {
                        navigate(-1);
                    }}>
                    Go back
                </button>
            </div>
        </main>
    )
}

export default PageNotFound