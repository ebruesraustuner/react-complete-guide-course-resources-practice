import { useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function ProjectDetailNew({onAddProject, onCancelProject}){
   const title = useRef();
   const description = useRef();
   const dueDate = useRef();

   const [hasError, setError] = useState()
   

   function handleSaveProject(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

      
        const hasErrorValue = enteredTitle?.trim() === '' || enteredDescription?.trim() === '' || enteredDueDate?.trim() === ''
        setError(() => hasErrorValue)
        if(!hasErrorValue) {
            onAddProject({
                title: enteredTitle,
                detail: enteredDescription,
                date: enteredDueDate,
                id: Math.random()
            })
        }
        
   }

    return (
       <>
            <section className="w-[35rem]">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <Button onClick={onCancelProject}> Cancel </Button>
                    </li>
                    <li>
                        <Button onClick={handleSaveProject}> Save </Button>
                    </li>
                </menu>
                
                {
                    hasError ? 
                    (
                        <div className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
                            <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                                <p className="text-stone-600 mb-4">
                                Oops ... looks like you forgot to enter a value.
                                </p>
                                <p className="text-stone-600 mb-4">
                                Please make sure you provide a valid value for every input field.
                                </p>

                                <Button onClick={() => setError()}> OK </Button>

                        </div>
                    ) : 
                    (
                        <div>
                            <form>
                                <Input ref={title} type="text" label='TITLE' />
                                <Input ref={description} type="text" textarea label='Description' />
                                <Input ref={dueDate} type="date" label='Due Date' />
                            </form> 
                        </div> 
                    )
                }
                
            </section>
        </> 
    )
}