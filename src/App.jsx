import { Layout } from "./Layout/Layout"
import { DashboardProvider } from "./context/DashboardProvider"

function App() {

    return (
        <>
            <DashboardProvider>
                <Layout />
            </DashboardProvider>
        </>
    )
}

export default App
