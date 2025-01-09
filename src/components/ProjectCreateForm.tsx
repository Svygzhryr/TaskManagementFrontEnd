import { Dispatch, FC, useState } from "react";
import { ButtonPrimary } from "./ButtonPrimary";
import Cinput from "./Cinput";

interface ProjectCreateFormProps {
  setIsFormActive: Dispatch<React.SetStateAction<boolean>>;
}

const ProjectCreateForm: FC<ProjectCreateFormProps> = ({ setIsFormActive }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [userIds, setUserIds] = useState([]);

  function handleCreateProject() {}

  function handleFormClose() {
    setIsFormActive(false);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 text-center">Create a project</h3>
        <Cinput placeholder="Name" type="text" />
        <Cinput placeholder="Description" type="text" />

        {/* кастомный инпут под приглашение людей по айди */}
        {/* <Cinput placeholder="Invite some people" type="text" /> */}
        <div className="flex justify-center">
          <ButtonPrimary text="Cancel" clickHandler={handleFormClose} />
          <ButtonPrimary text="Create" clickHandler={handleCreateProject} />
        </div>
      </div>
    </>
  );
};

export default ProjectCreateForm;
