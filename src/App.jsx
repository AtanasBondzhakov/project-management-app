import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: []
    });

    const handleStartAddProject = () => {
        setProjectsState(state => {
            return {
                ...state,
                selectedProjectId: null
            }
        })
    };

    const handleAddProject = (projectData) => {
        setProjectsState(state => {
            const newProject = {
                ...projectData,
                id: Math.random()
            }

            return {
                ...state,
                projects: [...projectsState.projects, newProject]
            };
        })
    }

    console.log(projectsState);
    

    let content;

    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} />
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar onStartAddProject={handleStartAddProject} />
            {content}
        </main>
    );
}

export default App;
