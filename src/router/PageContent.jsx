
import { Navbar } from "../views"
import { RouterViews } from "./routes/RouterViews"


export const PageContent = () => {
  return (
    <>
        <div id="page-content-wrapper">
            <Navbar />
            <RouterViews />
        </div>
    </>
  )
}
