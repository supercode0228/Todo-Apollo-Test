import React, { useState } from 'react'
import { uuid } from 'uuidv4'
import TodoItem from '../components/TodoItem'
import { ENTER_KEY } from '../constants'

import '../styles/todoList.css'

const TodoList = () => {
  const [value, setValue] = useState('')
  const [todoList, setTodoList] = useState([])
  const [selectedId, setSelectedId] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setValue(value)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode !== ENTER_KEY) {
      return
    }

    if (value === '') {
      alert('Pleaes enter the todo Item.')
      return
    }

    e.preventDefault()
    setTodoList([
      ...todoList,
      {
        id: uuid(),
        value,
      },
    ])
    setValue('')
  }

  const handleDoubleClick = ({ id, value }) => {
    setSelectedId(id)
  }

  const handleEdit = ({ id, value }) => {
    setTodoList(
      todoList.map((e) => {
        if (e.id === id) {
          return { id, value }
        }
        return e
      }),
    )
    setSelectedId('')
  }

  return (
    <div className="todo-container">
      <div className="todo-container__header">
        <input
          required
          className="todo-input"
          type="text"
          value={value}
          placeholder="What needs to be done?"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <ul className="todo-items">
        {todoList.map(({ id, value }) => (
          <li
            className="todo-items__element"
            key={id}
            onDoubleClick={() => handleDoubleClick({ id, value })}
          >
            <TodoItem
              key={id}
              {...{ id, value, selected: selectedId === id }}
              onEdit={handleEdit}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
