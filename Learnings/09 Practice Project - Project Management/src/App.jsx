import { useState } from "react";
import ProjectDetail from "./components/ProjectDetail";
import ProjectList from "./components/ProjectList";
import Tasks from "./components/Tasks";

function App() {
  const initialProjectList = [
    {
      title: 'Learning React',
      date: '27/03/2025',
      id: '1',
      detail: 'Learning React with basic'
    },
    {
      title: 'Master React',
      date: '27/03/2025',
      id: '2',
      detail: 'mastering React with basic'
    }]

  const initialTaskList = [
    {
      taskId: '1',
      detail: 'kurs bitirmek',
      projectId: '1'
    },
    {
    taskId: '4',
    detail: 'todo list',
    projectId: '2'
    },
    {
      taskId: '2',
      detail: 'ek ödev',
      projectId: '2'
    },
    {
      taskId: '3',
      detail: 'ek ödev 2',
      projectId: '2'
    }]


  const [projectList, setProjectList] = useState({Projects: initialProjectList, Tasks: initialTaskList});
  console.log("🚀 ~ App ~ projectList:", projectList)
  const [selected, setSelected] = useState(null);
  const [isAddingNewProject, setNewProject] = useState(false)


  function onSelectedProject(id) {
    console.log("🚀 ~ onSelectedProject ~ id:", id)
    const selected = projectList.Projects.find((project) => project.id === id);
    setSelected({...selected, tasks: projectList.Tasks.filter(task => task.projectId === id)})
  }

  function handleClear(){
    setSelected(null);
    setNewProject(false);
  }

  function onAddingProject(){
    setSelected(null);
    setNewProject(true);
  }

  function handleClearTasks(id){
    if(selected){
      setProjectList((prevs) => {
        return {
          ...prevs,
          Tasks: prevs.Tasks.filter(task => task.taskId !== id)
        }
      })
    }
  }

  function onAddProject(projectDetail) {
    setProjectList(prevs => {
      return {
        ...prevs,
        Projects: [...prevs.Projects, projectDetail]
      }
    })
    handleClear();
  }

  function onDeleteProject() {
    setProjectList(prevs => {
      return {
        ...prevs,
        Projects: prevs.Projects.filter(p => p.id !== selected.id),
        Tasks: prevs.Tasks.filter(task => task.projectId !== selected.id)
      }
    })
    handleClear();
  }

  function onAddTask(task) {
    setProjectList(prevs => {
      return {
        ...prevs,
        Tasks: [...prevs.Tasks, {taskId: Math.random(), detail:task, projectId: selected.id}]
      }
    })
  }

  function onCancelProject(){
    handleClear();
  }




  return (
    <>
      <main className="flex mt-6">
          <ProjectList projectList={projectList.Projects} handleSelectedProject={onSelectedProject} handleAddingProject={onAddingProject} handleAddProject={onAddProject} handleCancelProject={onCancelProject}/>
          <ProjectDetail selected={selected} isAddingNew={isAddingNewProject} handleClearTasks={handleClearTasks} handleAddingProject={onAddingProject} handleAddProject={onAddProject} handleCancelProject={onCancelProject} handleDeleteProject={onDeleteProject} handleAddTask={onAddTask}/>
      </main> 
      
    </>
  );
}

export default App;
