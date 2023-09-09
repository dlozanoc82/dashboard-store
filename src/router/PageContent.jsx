import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { Navbar } from "../views"


export const PageContent = () => {
  return (
    <>
        <div id="page-content-wrapper">
            <Navbar />
        </div>
    </>
  )
}
