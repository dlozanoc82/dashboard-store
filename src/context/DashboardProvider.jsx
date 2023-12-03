import { createContext, useState, useEffect } from "react";

const DashboardContext = createContext();

const DashboardProvider = ({children}) => {

    const [titleUrl, setTitleUrl] = useState('');
    const [iconNav, setIconNav] = useState();
    const [tableHeaders, setTableHeaders] = useState([]);
    
    //Mantener el apartado:
    const localStorageKey = 'selectedOption';

    //Mantener la informacion si estamos en el mismo apartado:
    // Active Option from local storage on page reload
    useEffect(() => {
        const selectedOption = localStorage.getItem(localStorageKey);
        if (selectedOption) {
            setActiveOption(selectedOption);
        }
    }, []);

    //SideBar
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const handleToggle = () => setToggleSidebar(!toggleSidebar);
    
    //Active Option
    const [activeOption, setActiveOption] = useState('Panel');
    const handleActiveOption = (title, icon) => {
        setActiveOption(title);
        setTitleUrl(title);
        setIconNav(icon);
        localStorage.setItem(localStorageKey, title);
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
                localStorageKey,
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
