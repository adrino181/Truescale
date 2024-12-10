import React from "react";
import FormBuilder from "@/components/Blocks/FormBuilder";
import { groupConfig } from "./templates/groupForm";
import { FormLayout } from "@/components/Blocks/FormBuilder/layouts";

const CreateGroupForm = ({ status, submitHandler }) => {
  return (
    <>
      <FormBuilder
        config={groupConfig}
        startingStep={0}
        fieldsContainer={FormLayout.FieldsContainer}
        navigationContainer={FormLayout.NavigationContainerRow}
        submitHandler={submitHandler}
        setExternalError={() => {}}
        onSuccessRedirectTo="/"
      />
    </>
  );
};

export default CreateGroupForm;
