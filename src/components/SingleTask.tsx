import React, { useState } from 'react'
import { useRef, useEffect } from "react";
import { Task } from "../models/model"
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import "./styles.css"

interface Props {
    task: Task,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const SingleTask = ({ task, tasks, setTasks }: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<string>(task.taskText);


    const handleDelete = (id: string) => {
        setTasks(
            tasks.filter((task) => task.id !== id)
        );
    };

    const handleDone = (id: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, isDone: !task.isDone } : task
            )
        );
    };

    const handleEdit = (e: React.FormEvent, id: string) => {
        e.preventDefault()
        setTasks(
            tasks.map((task) => (task.id === id ? { ...task, taskText: editTask } : task))
        );
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])


    return (
        <form className="taskList__single-item" onSubmit={(e)=> handleEdit(e, task.id)}>
            {
                edit ? (<input ref={inputRef} value = {editTask} onChange={(e) => setEditTask(e.target.value)} className='taskList__single-item--text'/>) : (
                    task.isDone ? (
                        <s className="taskList__single-item--text"> {task.taskText} </s>
                    ) : (
                        <span className="taskList__single-item--text"> {task.taskText} </span>
                    )
                )
            }


            <div>
                <span className="icon"
                    onClick={() => {
                        if (!edit && !task.isDone) {
                            setEdit(!edit);
                        }
                    }}>
                    <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(task.id)}>
                    <AiFillDelete />
                </span>
                <span className="icon" onClick={() => handleDone(task.id)}>
                    <MdDone />
                </span>
            </div>
        </form>
    );
};

export default SingleTask;