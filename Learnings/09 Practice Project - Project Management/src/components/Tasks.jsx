import { useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function Tasks({selected, handleClearTasks, onAdd}){
  const [enteredTask, setEnteredTask] = useState('')
  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === '') {
      return;
    }
    onAdd(enteredTask);
    setEnteredTask('');
  }

    return (
        <div>
            <h2 className="my-8 text-center text-3xl font-bold">Tasks</h2>
           <Input type="text"  className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} value={enteredTask}/>
           <Button onClick={handleClick}>Add Task</Button>
           {selected ? (
            <section className="bg-slate-100 rounded-md">
                {selected.map((s, i) => (
                    <p key={i}>
                        {s.detail}
                        <Button onClick={() => handleClearTasks(s.taskId)}>
                            Clear
                        </Button>
                    </p>
                    
                ))}
                

            </section> 
           ) : (
           <p>
            'tebrikler listeniz boş'
           </p> 
           )}
           
        </div>
    )
}