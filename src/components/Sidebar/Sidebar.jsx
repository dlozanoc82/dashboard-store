import { SideBarHeader, SidebarOptions } from "./components"


export const Sidebar = () => {
  return (
    <>
        <div className="bg-white" id="sidebar-wrapper">
            <SideBarHeader />
            <SidebarOptions />
        </div>
    </>
  )
}
