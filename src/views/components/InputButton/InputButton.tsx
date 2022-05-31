import React, { Component, FC, useCallback, useState } from 'react'
import styles from './input-button.module.scss'

interface InputButtonProps {
    onAdd: (title: string) => void
}

export const InputButton: FC<InputButtonProps> = ({
    onAdd
}) => {
    const [inputValue, setInputValue] = useState('')
    const addTask = useCallback(() => {
        onAdd(inputValue)
        setInputValue("")
    }, [inputValue])


    return (
        <div className={styles.inputContainer}>
            <input
                value={inputValue}
                placeholder='Add task...'
                type="text"
                className={styles.inputContainerField}
                onChange={(event) => {
                    setInputValue(event.target.value)
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        addTask()
                    }
                }}
            />
            <button onClick={addTask} className={styles.inputContainerButton}>+</button>
        </div>
    )
}
