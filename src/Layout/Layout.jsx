import { BrowserRouter } from "react-router-dom";
import useDashborad from "../hooks/useDashborad";
import { PageContent } from "../router/PageContent"
import { Sidebar } from "../views"



export const Layout = () => {

    const { toggleSidebar } = useDashborad();

    return (
        <div className={toggleSidebar ?  "d-flex toggled" : "d-flex" } id="wrapper"> 
            <BrowserRouter > 
                <Sidebar />
                <PageContent />
            </BrowserRouter>
        </div>
    )
}
