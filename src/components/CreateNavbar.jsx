import Link from "next/link";
//test github
export const CreateObjects = () => {
  return (
    <nav className="bg-gray-950 py-5 mb-2">
      <div className="container px-10 md:px-0 mx-auto flex justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">NextMongo</h1>
        </Link>
        <ul className="flex gap-x-4 ">
          <li>
            <Link href="/crud/tasks/new">new task</Link>
          </li>
          <li>
            <Link href="/crud/accounts/new">new account</Link>
          </li>
          <li>
            <Link href="/crud/countries/new">new country</Link>
          </li>
          <li>
            <Link href="/crud/sites/new">new sites</Link>
          </li>
          <li>
            <Link href="/crud/sessions/new">new session</Link>
          </li>
          <li>
            <Link href="/crud/travels/new">new travel</Link>
          </li>
          <li>
            <Link href="/crud/users/new">new user</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
