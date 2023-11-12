import { createContext, useState } from "react";


const DashboardContext = createContext();

const DashboardProvider = ({children}) => {

    const [titleUrl, setTitleUrl] = useState('');
    const [iconNav, setIconNav] = useState();
    const [tableHeaders, setTableHeaders] = useState([]);

    //SideBar
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const handleToggle = () => setToggleSidebar(!toggleSidebar);
    
    //Active Option
    const [activeOption, setActiveOption] = useState('Panel');
    const handleActiveOption = (title, icon) => {
        setActiveOption(title);
        setTitleUrl(title);
        setIconNav(icon);
    };

    // useEffect(() => {

    // },[])

    return (
        <DashboardContext.Provider
            value={{
                activeOption,
                toggleSidebar,
                handleToggle, 
                handleActiveOption,
                titleUrl, 
                iconNav,
                tableHeaders,
                setTableHeaders,
                setIconNav
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
