import { useContext } from "react"
import { ProjectsContext } from "../Providers/ProjectProvider.tsx"

export const useProject = () => {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProject must be used within a ProjectsProvider")
  }
  return context
}
