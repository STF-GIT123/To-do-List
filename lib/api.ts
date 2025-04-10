const BASE_URL = "http://localhost:4000/api";

export async function fetchTodos(page = 1) {
  const res = await fetch(`${BASE_URL}/todos?page=${page}`, { cache: "no-store" });
  return res.json();
}

export async function fetchTodo(id: string) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, { cache: "no-store" });
  return res.json();
}

export async function createTodo(title: string, description: string) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  return res.json();
}

export async function updateTodo(id: string, title: string, description: string) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  return res.json();
}