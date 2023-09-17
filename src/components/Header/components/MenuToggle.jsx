import useDashborad from "../../../hooks/useDashborad"

export const MenuToggle = () => {

    

    const { handleToggle, activeOption } = useDashborad();

    return (
        <div className="d-flex align-items-center">
            <i onClick={handleToggle} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
            <h2 className="fs-2 m-0">{activeOption}</h2>
        </div>
    )
}
