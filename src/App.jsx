import PlannerPage from "./pages/PlannerPage"
import { PlannerProvider } from "./contexts/PlannerContext";

function App() {
  return (
    <main>
      <PlannerProvider>
        <PlannerPage/>
      </PlannerProvider>   
    </main>
  )
}

export default App
