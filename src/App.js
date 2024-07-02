import { useState } from "react";
export default function App() {
  const [items, setItems] = useState([]);

  function handleAdditems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelet(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdate(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAdd={handleAdditems} />
      <PackingList
        item={items}
        onDelete={handleDelet}
        onUpdate={handleUpdate}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>⛳ Far Away 🎭 </h1>;
}

function Form({ onAdd }) {
  const [description, setDescription] = useState("");
  const [numb, setNumb] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      return;
    }
    const newItem = { description, numb, packed: false, id: Date.now() };
    console.log(newItem);
    onAdd(newItem);
    setDescription("");
    setNumb(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={numb} onChange={(e) => setNumb(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}

function PackingList({ item, onDelete, onUpdate }) {
  const [sortby, setSortBy] = useState("input");
  let sortItem;
  if (sortby === "input") sortItem = item;
  if (sortby === "description")
    sortItem = item
      .slice()
      .sort((a, b) => a.description.localCompare(b.description));
  if (sortby === "packed")
    sortItem = item.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortItem.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
      <div className="actions">
        <select valu={sortby} onChange={(e) => setSortBy}>
          <option value="input"> Sort by input</option>
          <option value="description">Sort by descrption</option>
          <option value="packed">Sort by packed item</option>
        </select>
      </div>
    </div>
  );
}
function Item({ item, onDelete, onUpdate }) {
  return (
    <li>
      <input
        type="checkbox"
        valu={item.packed}
        onChange={() => onUpdate(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.numb}

        {"  "}
        {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  const numItem = items.length;
  const numpacked = items.filter((item) => item.packed).length;
  const percent = Math.round((numpacked / numItem) * 100);
  return (
    <footer className="stats">
      <em>
        you have {numItem} item on ypur list , and you already packed{" "}
        {numpacked} ({percent}%)
      </em>
    </footer>
  );
}
