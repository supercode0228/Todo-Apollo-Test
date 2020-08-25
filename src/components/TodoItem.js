import React, { useState } from 'react'
import { ENTER_KEY } from '../constants'

function TodoItem({ id, value, selected, completed, onEdit, onCompleted }) {
  const [editValue, setEditValue] = useState(value)
  const handleEditText = (e) => {
    setEditValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode !== ENTER_KEY) {
      return
    }

    if (editValue === '') {
      alert('Pleaes enter the todo Item.')
      return
    }

    e.preventDefault()
    onEdit({ id, value: editValue })
  }

  return (
    <div className="todo-item">
      <div className="todo-item__header">
        {!selected && (
          <div className="todo-item__check" onClick={() => onCompleted(id)}>
            {completed && <i className="fa fa-check todo-item__check__icon" />}
          </div>
        )}
        {selected ? (
          <input
            required
            className="todo-item__edit__input"
            onChange={handleEditText}
            value={selected ? editValue : value}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div
            className={`todo-item__label ${
              completed && 'todo-item__label__completed'
            }`}
          >
            {value}
          </div>
        )}
      </div>
      {!selected && <div className="todo-item__close" />}
    </div>
  )
}

export default TodoItem
