"use client";

import { useEffect, useState } from "react";
import { fetchTodo, updateTodo } from "../../../lib/api";

export default function TodoPage({ params }: any) {
  const [todo, setTodo] = useState<any>(null);

  useEffect(() => {
    fetchTodo(params.id).then(setTodo);
  }, [params.id]);

  const handleChange = (field: string, value: string) => {
    const updated = { ...todo, [field]: value };
    setTodo(updated);
    updateTodo(params.id, updated.title, updated.description);
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <input
        value={todo.title}
        onChange={(e) => handleChange("title", e.target.value)}
        className="text-xl font-bold border-b"
      />
      <textarea
        value={todo.description}
        onChange={(e) => handleChange("description", e.target.value)}
        className="w-full mt-4 border"
      />
    </div>
  );
}