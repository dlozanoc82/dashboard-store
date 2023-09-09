import { createContext, useState } from "react";


const DashboardContext = createContext();

const DashboardProvider = ({children}) => {

    //SideBar
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const handleToggle = () => setToggleSidebar(!toggleSidebar);
    
    //Active Option
    const [activeOption, setActiveOption] = useState('Panel');
    const handleActiveOption = (option) => setActiveOption(option);

    return (
        <DashboardContext.Provider
            value={{
                activeOption,
                toggleSidebar,
                handleToggle, 
                handleActiveOption
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export {
    DashboardProvider
}

export default DashboardContext;
