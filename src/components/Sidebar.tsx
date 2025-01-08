import { useEffect, useState } from "react";
import { apiCall } from "../utils/api/auth";

const mockProjects = [
  { name: "govno", project_id: 0 },
  { name: "jepa", project_id: 1 },
  { name: "pryaniki s medom", project_id: 2 },
];

export default function Sidebar() {
  const [projects, setProjects] = useState([]);

  async function getProjects() {
    const requestProjects = await apiCall("/project/", "GET");
    setProjects(requestProjects ?? []);
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="block px-8 py-8 left-0 max-w-xs w-1/3 h-screen bg-main-1000">
        <h3 className="text-3xl text-center">Projects</h3>
        <ul className="grid gap-2 mt-8">
          {mockProjects.map((project) => (
            <li className="text-center" key={project.project_id}>
              <button className="w-full py-2 text-xl bg-main-900 hover:cursor-pointer hover:bg-main-700 transition-all">
                {project.name}
              </button>
              {/* <button>X</button> */}
            </li>
          ))}
          <li>
            <button className="w-full text-5xl text-main-700 py-2 bg-main-1000 border-4 border-solid border-main-900 hover:cursor-pointer hover:bg-main-900 transition-all">
              +
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
