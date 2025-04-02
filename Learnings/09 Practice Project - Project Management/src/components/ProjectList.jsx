import Button from "./Button";

export default function ProjectList({projectList, handleSelectedProject, handleAddingProject}){

    return (
        <div className="h-screen bg-stone-950 text-white rounded-r-lg p-8">
            <h1 className="my-8 text-center text-3xl font-bold">Your Projecs</h1>
            <Button onClick={handleAddingProject}> + Add Project</Button>
            {
              projectList.length > 0 && projectList.map((project) => (
                    <ul key={project.id} className="mt-2">
                        <li onClick={() => handleSelectedProject(project.id)}> 
                            {project.title}
                        </li>
                    </ul>
                ))
            }
            
        </div>



    )
}