import Tasks from "./Tasks";
import ProjectDetailEmpty from "./ProjectDetailEmpty"
import ProjectDetailNew from "./ProjectDetailNew"
import Button from "./Button";

export default function ProjectDetail({selected, handleClearTasks, isAddingNew, handleAddingProject, handleAddProject, handleCancelProject, handleDeleteProject, handleAddTask}){

    return (
       <>
       {selected ? ( 
            <div className="p-4 m-2 w-2/3">
                <section id="project-detail">
                    <div>
                        <h1 className="my-8 text-center text-3xl font-bold">{selected.title}</h1>
                        <p>{selected.date}</p>
                        <Button onClick={handleDeleteProject}>Delete</Button>
                    </div>
                    <div>
                        <span>
                            {selected.detail}
                        </span>
                    </div>
                </section>
                <hr />
                <section id="project-tasks">
                    <Tasks selected={selected.tasks} handleClearTasks={handleClearTasks} onAdd={handleAddTask}/>
                </section>
                

            </div>
        ) : isAddingNew ? (
            <section className="p-4 m-2 w-full">
                <ProjectDetailNew onAddProject={handleAddProject} onCancelProject={handleCancelProject}/>
            </section>
       ) : <section className="p-4 m-2 w-full">
                <ProjectDetailEmpty onStartAddProject={handleAddingProject}/>
            </section>}
        </> 
    )
}