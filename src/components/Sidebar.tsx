import { useEffect, useState } from "react";
import { apiCall } from "../utils/api/auth";
import ProjectCreateForm from "./ProjectCreateForm";

const mockProjects = [
  { name: "govno", project_id: 0 },
  { name: "jepa", project_id: 1 },
  { name: "pryaniki s medom", project_id: 2 },
];

export default function Sidebar() {
  const [projects, setProjects] = useState([]);
  const [isFormActive, setIsFormActive] = useState(false);

  async function getProjects() {
    const requestProjects = await apiCall("/project/", "GET");
    setProjects(requestProjects ?? []);
  }

  async function handleProjectCreate() {
    setIsFormActive(true);
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="block px-8 py-8 left-0 w-[500px]  h-screen bg-main-1000">
        {isFormActive ? (
          <ProjectCreateForm setIsFormActive={setIsFormActive} />
        ) : (
          <>
            <div className="relative flex justify-center items-center gap-6">
              <h3 className="text-3xl text-center">Projects</h3>
              <button
                onClick={handleProjectCreate}
                className="absolute right-2 w-11 h-11 text-3xl text-main-700 bg-main-1000 border-4 border-solid border-main-900 hover:cursor-pointer hover:text-main-200 hover:bg-main-900 transition-all "
              >
                +
              </button>
            </div>
            <ul className="grid gap-2 mt-8 overflow-auto">
              {mockProjects.map((project) => (
                <li className="text-center" key={project.project_id}>
                  <button className="w-full py-2 text-xl bg-main-900 hover:cursor-pointer hover:bg-main-700 transition-all">
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
