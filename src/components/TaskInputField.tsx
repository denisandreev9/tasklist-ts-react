import React, { useRef } from 'react'
import "./styles.css"

interface Props {
    taskText: string;
    settaskText: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void;
}

const TaskInputField = ({ taskText, settaskText, handleAdd }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className="input" onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur()
        }}>
            <input type="input"
                ref={inputRef}
                value={taskText}
                onChange={(e) => settaskText(e.target.value)}
                placeholder="Enter a task"
                className="input__box" />
            <button className="input__submit" type="submit"> Add </button>
        </form>
    )
}

export default TaskInputField