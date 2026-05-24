import {useState} from 'react'

let nextId = 1;

const App = () => {
  const [input, setInput] = useState("");
  const [addTodo, setAddTodo] = useState([]);

  function handleAdd() {
    if(!input.trim("")) return;
    setAddTodo([...addTodo, {id: nextId++, input: input}])
    setInput("")
  }

  return (
    <>
      <h1 className='text-5xl font-semibold text-center mt-5 underline'>My Todos</h1>

      <div className="w-[50%] mt-10 mx-auto">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-green-400 transition-all">
          <span className="text-gray-400 text-xl">📝</span>
          <input
            className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-base bg-transparent"
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <button
            className="bg-green-500 hover:bg-green-600 active:scale-95 text-white text-sm font-medium px-5 py-2 rounded-xl cursor-pointer transition-all duration-150"
            onClick={handleAdd}
          >
            + Add task
          </button>
        </div>
      </div>

      <ul className='mt-5 flex flex-col items-center gap-3'>
        {addTodo.map((todo, index) => (
            <li
              key={todo.id}
              className='flex items-center justify-between w-[60%] bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm text-lg list-none'
            >
              <div className='flex items-center gap-3'>
                <span className='text-sm font-medium bg-gray-100 text-gray-500 rounded-full w-6 h-6 flex items-center justify-center'>
                  {index + 1}
                </span>
                <span className={todo.done ? 'line-through text-gray-400' : ''}>
                  {todo.input}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  className={`px-5 py-1.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-150 active:scale-95 ${
                    todo.done
                      ? 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                  onClick={() => setAddTodo(addTodo.map(a => a.id === todo.id ? { ...a, done: !a.done } : a))}
                >
                  {todo.done ? '↩ Undo' : '✓ Done'}
                </button>
                <button
                  className='px-5 py-1.5 rounded-xl text-sm font-medium text-white cursor-pointer bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-150'
                  onClick={() => setAddTodo(addTodo.filter(a => a.id !== todo.id))}
                >
                  🗑 Delete
                </button>
              </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App