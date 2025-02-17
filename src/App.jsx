import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
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
                selectedProjectId: undefined,
                projects: [...projectsState.projects, newProject]
            };
        })
    };

    const handleCancelProject = () => {
        setProjectsState(state => {
            return {
                ...state,
                selectedProjectId: undefined
            }
        })
    };

    const handleSelectProject = (projectId) => {
        setProjectsState(state => {
            return {
                ...state,
                selectedProjectId: projectId
            }
        });
    };

    const handleDeleteProject = (targetId) => {
        const filteredProjects = projectsState.projects.filter(project => project.id !== targetId);

        setProjectsState(state => {
            return {
                ...state,
                selectedProjectId: undefined,
                projects: filteredProjects
            }
        });
    };

    const handleAddTask = (text) => {
        setProjectsState(state => {
            const newTask = {
                text,
                projectId: state.selectedProjectId,
                id: Math.random()
            }

            return {
                ...state,
                tasks: [newTask, ...state.tasks]
            };
        })
    }

    const handleDeleteTask = (targetId) => {
        const filteredTasks = projectsState.tasks.filter(task => task.id !== targetId);

        setProjectsState(state => {
            return {
                ...state,
                tasks: filteredTasks
            }
        });
    };

    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

    let content = (
        <SelectedProject
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks}
        />
    )

    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projectsList={projectsState.projects}
                onSelect={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
