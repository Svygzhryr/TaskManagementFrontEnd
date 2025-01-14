import { ChangeEvent, FC, useState } from "react";
import { apiCall } from "../utils/api/auth";
import { ProjectCreateFormProps } from "../utils/types";
import { ButtonPrimary } from "./ButtonPrimary";
import Cinput from "./Cinput";

const ProjectCreateForm: FC<ProjectCreateFormProps> = ({ setIsFormActive }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  // const [userIds, setUserIds] = useState([]);

  function handleFormClose() {
    setIsFormActive(false);
  }

  function handleNameChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  }

  function handleDescriptionChange(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setDesc(target.value);
  }

  async function handleCreateProject() {
    const body = {
      name,
      description: desc,
      // users
    };

    await apiCall("/project/", "POST", { endpoint: "task" }, body);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 text-center">Create a project</h3>
        <Cinput
          handleOnChange={handleNameChange}
          placeholder="Name"
          type="text"
        />
        <Cinput
          handleOnChange={handleDescriptionChange}
          placeholder="Description"
          type="text"
        />

        {/* кастомный инпут под приглашение людей по айди */}
        {/* <Cinput placeholder="Invite some people" type="text" /> */}
        <div className="flex justify-center">
          <ButtonPrimary text="Cancel" clickHandler={handleFormClose} />
          <ButtonPrimary
            disabled={!name || !desc}
            text="Create"
            clickHandler={handleCreateProject}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectCreateForm;
