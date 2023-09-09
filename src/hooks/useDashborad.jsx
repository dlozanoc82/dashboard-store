import { useContext } from "react"
import DashboardContext from "../context/DashboardProvider"

const useDashborad = () => {
  return useContext(DashboardContext);
}

export default useDashborad;
