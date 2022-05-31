import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

interface InputTaskProps {
    id: string,
    title: string
    onDone: (title: string) => void
    onEdit: (id: string, title: string) => void
    onRemove: (id: string) => void

}

export const InputTask: FC<InputTaskProps> = ({
    id, title, onDone, onEdit, onRemove
}) => {
    const [checked, setChecked] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(title)
    const editTitleRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditing) {
            editTitleRef.current?.focus()
        }
    }, [isEditing])

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    type="checkbox"
                    disabled={isEditing}
                    checked={checked}
                    className={styles.inputTaskCheckbox}
                    onChange={(event) => {
                        setChecked(event.target.checked)
                        if (event.target.value) {
                            setTimeout(() => {
                                onDone(id)
                            }, 300)
                        }
                    }} />
                {isEditing ? (
                    <input
                        ref={editTitleRef}
                        type="text"
                        value={value}
                        className={styles.inputTaskEditing}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                onEdit(id, value)
                                setIsEditing(false)
                            }
                        }}
                        onChange={(event) => {
                            setValue(event.target.value)
                        }}
                    />
                ) : (
                    <h3 className={styles.inputTaskTitle}>{title}</h3>

                )}
            </label>
            {isEditing ? (
                <button
                    className={styles.inputTaskSave}
                    onClick={() => {
                        onEdit(id, value)
                        setIsEditing(false)
                    }}
                >
                    Save
                </button>
            ) : (
                <button
                    className={styles.inputTaskEdit}
                    onClick={() => {
                        setIsEditing(true)
                    }}
                >
                    Edit
                </button>
            )}
            <button
                className={styles.inputTaskRemove}
                onClick={() => {
                    if (confirm('Are you sure?')) {
                        onRemove(id)
                    }
                }}
            >
                x
            </button>
        </div>
    )
}
