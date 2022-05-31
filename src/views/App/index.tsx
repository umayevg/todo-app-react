import React, {useEffect} from "react";

import {useTodoStore} from "../../data/stores/useTodoStore";
import {InputButton} from "../components/InputButton/InputButton";
import {InputTask} from "../components/inputTask";

import styles from './index.module.scss'

export const App: React.FC = () => {

    const [
        tasks,
        createTask,
        updateTask,
        removeTask
    ] = useTodoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ])


    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>Todo List</h1>
            <section className={styles.articleSection}>
                <InputButton
                    onAdd={(title) => {
                        if (title) {
                            createTask(title)
                        }
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && (
                    <p className={styles.articleText}>There is no one task!</p>
                )}

                {tasks.map((task) => (
                    <InputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        onDone={removeTask} onEdit={updateTask} onRemove={removeTask}/>
                ))}
            </section>
        </article>
    )
}

// 1:30:56