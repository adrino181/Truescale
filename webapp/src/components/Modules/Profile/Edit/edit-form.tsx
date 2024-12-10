import React from "react";
import FormBuilder from "@/components/Blocks/FormBuilder";
import { profileEditConfig } from "./templates/editForm";
import { FormLayout } from "@/components/Blocks/FormBuilder/layouts";

const EditForm = ({ status, submitHandler, configs }) => {
  return (
    <>
      <FormBuilder
        config={profileEditConfig}
        startingStep={0}
        fieldsContainer={FormLayout.FieldsContainer}
        navigationContainer={FormLayout.NavigationContainerRow}
        submitHandler={submitHandler}
        setExternalError={() => {}}
        onSuccessRedirectTo="/"
        initialConfigValues={configs}
      />
    </>
  );
};

export default EditForm;
