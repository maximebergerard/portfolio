import { createContext, ReactNode, useState } from "react"

type Projects = "wino" | "smartgarant" | "rubiksCube" | "none"

interface ProjectsContextProps {
  projects: Projects
  toggleProjects: (newProjects: Projects) => void
}

export const ProjectsContext = createContext<ProjectsContextProps | undefined>(
  undefined,
)

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Projects>("none")

  const toggleProjects = (newProjects: Projects) => {
    setProjects(newProjects)
  }

  return (
    <ProjectsContext.Provider value={{ projects, toggleProjects }}>
      {children}
    </ProjectsContext.Provider>
  )
}
