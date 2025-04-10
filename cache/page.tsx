import { fetchTodos, createTodo } from "../lib/api";
import Link from "next/link";

interface Props{
  searchParams?:Record<string, string | string[] | undefined>;
}
export default async function Home({ searchParams }: Props) {
  const pageParam = Array.isArray(searchParams?.page) ? searchParams?.page[0] : searchParams?.page;
  const page = parseInt(pageParam || "1");
  const todos = await fetchTodos(page);

  return (
    <div className="flex gap-4 p-6">
      <div className="w-1/2">
        <form
          action={async (formData) => {
            "use server";
            const title = formData.get("title") as string;
            const description = formData.get("description") as string;
            await createTodo(title, description);
          }}
        >
          <input name="title" placeholder="Title" required className="border p-2" />
          <textarea name="description" placeholder="Description" required className="border p-2" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Todo</button>
        </form>

        <ul className="mt-4">
          {todos.map((todo: any) => (
            <li key={todo._id}>
              <Link href={`/todo/${todo._id}`} className="text-blue-500">{todo.title}</Link>
            </li>
          ))}
        </ul>

        <div className="mt-2">
          <Link href={`/?page=${page - 1}`}>Prev</Link> | <Link href={`/?page=${page + 1}`}>Next</Link>
        </div>
      </div>
    </div>
  );
}