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
           <div className="flex justify-between p-2">
                <Input type="text"  className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} value={enteredTask}/>
                <Button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</Button>
           </div>
           {selected && selected.length > 0 ? (
            <section className="mt-8 rounded-md p-4 bg-slate-100 rounded-md">
                {selected.map((s, i) => (
                    <p key={i} className="flex justify-between w-full my-2">
                        <span className="content-center">{s.detail}</span>
                        <Button onClick={() => handleClearTasks(s.taskId)}>
                            Clear
                        </Button>
                    </p>
                    
                ))}
                

            </section> 
           ) : (
           <p>
            'Tebrikler listeniz boş'
           </p> 
           )}
           
        </div>
    )
}