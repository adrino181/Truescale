import React, {
  CSSProperties,
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as S from "./styles";
import { Warning } from "emotion-icons/entypo";
import Text from "../Text/Text";
import { Eye, EyeSlash } from "emotion-icons/bootstrap";
import { FieldProps } from "formik";
import {
  Field,
  InputTextComponent,
} from "@/components/Blocks/FormBuilder/types";
import theme from "@/styles/theme";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const DarkInput = styled(TextField)(({ theme }) => ({
  background: theme.palette.inputColor.main,
  color: "white",
  border: "none",
  padding: "0",
  margin: "0 0 10px 0",
  width: "100%",
  borderRadius: "4px",
  "&:after": {
    border: "none",
  },
  "&:before": {
    border: "none",
  },
  "&:hover:not(.Mui-disabled):before": {
    border: "none",
    "-webkit-transition": "unset",
    transition: "unset",
  },
  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));
const StyledInput = ({ ...props }) => <DarkInput {...props} />;

interface Props {
  ref: React.ForwardedRef<any>;
  fieldProps: FieldProps;
  currentItemComponent: InputTextComponent;
  item: Field;
  key?: string;
  maxLength?: number;
  showCharactersLeft?: boolean;
  setIsFieldFocused: React.Dispatch<React.SetStateAction<boolean>>;
  validate: () => Promise<string | undefined>;
}

export default function TextInput({
  ref,
  fieldProps,
  currentItemComponent,
  item,
  key,
  maxLength = 100,
  showCharactersLeft = false,
  setIsFieldFocused,
  validate,
}: Props) {
  const [input, setInput] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [extraStyling, setExtraStyling] = useState<CSSProperties>({});

  function onChangeMainInput(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
    fieldProps.field.onChange(event);
  }

  function onClickEyeIcon() {
    setShowPassword(!showPassword);
  }

  function getInputType(): HTMLInputTypeAttribute {
    if (currentItemComponent.props.inputType === "password") {
      return showPassword ? "text" : "password";
    }
    if (currentItemComponent.props.inputType === "email") {
      return "email";
    }

    if (currentItemComponent.props.inputType === "number") {
      return "number";
    }
    return "text";
  }

  useEffect(() => {
    const errorStyling: CSSProperties = {
      border: `${theme.spacing(1)} solid ${theme.palette.error.main}`,
      outline: `${theme.spacing(1)} solid ${theme.palette.error.main}`,
      boxShadow: `0 0 0 ${theme.spacing(4)}
			${theme.palette.error.main}60`,
    };

    if (fieldProps.form.errors[item.name]) {
      setExtraStyling(errorStyling);
      return;
    }

    setExtraStyling({});
  }, [fieldProps.form.errors, item.name]);

  const EndAdormentElement = useCallback(() => {
    if (currentItemComponent.props.inputType === "password") {
      console.log("use callback end adorment");
      return (
        <InputAdornment position="end">
          <S.EyeIconContainer onClick={onClickEyeIcon}>
            {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
          </S.EyeIconContainer>
        </InputAdornment>
      );
    }
    if (
      currentItemComponent.props.inputType === "number" &&
      currentItemComponent.props.unitPlaceholer
    ) {
      return <Text>{currentItemComponent.props.unitPlaceholer}</Text>;
    }
    return <></>;
  }, [showPassword, fieldProps]);
  return (
    <React.Fragment key={key}>
      <Text as={"body2"} color="textPrimary">
        {currentItemComponent.props.label?.content}
      </Text>
      <StyledInput
        ref={ref}
        type={getInputType()}
        maxLength={maxLength}
        {...fieldProps.field}
        {...fieldProps.meta}
        {...(currentItemComponent.props.isMulti
          ? { multiline: true, rows: currentItemComponent.props.rows || 1 }
          : {})}
        onChange={onChangeMainInput}
        id={item.id}
        placeholder={currentItemComponent.props.placeholder?.content ?? ""}
        aria-invalid={!!fieldProps.form.errors[item.name]}
        aria-describedby={`${
          currentItemComponent.props.hintText ? `hint-message-${item.id}` : ""
        }
                      ${
                        fieldProps.form.errors[item.name]
                          ? `error-message-${item.id}`
                          : ""
                      }
                    `}
        onBlur={async () => {
          fieldProps.form.setFieldError(`${item.name}`, await validate());
          fieldProps.form.setFieldTouched(`${item.name}`, true, false);
          setIsFieldFocused(false);
        }}
        onFocus={() => {
          setIsFieldFocused(true);
        }}
        inputProps={{
          style: {
            paddingTop: "10px",
            paddingBottom: "10px",
            flex: 1,
          },
        }}
        InputProps={{
          endAdornment: <EndAdormentElement />,
        }}
      />
      {fieldProps.form.errors[item.name] ? (
        <S.MandatoryContainerRow id={`error-message-${item.id}`}>
          <Warning size={20} />
          <S.MandatoryText as={"p"}>
            {fieldProps.form.errors[item.name] as string}
          </S.MandatoryText>
        </S.MandatoryContainerRow>
      ) : (
        <>
          {currentItemComponent.props?.hintText ? (
            <Text id={`hint-message-${item.id}`}>
              {currentItemComponent.props.hintText?.content}
            </Text>
          ) : (
            <>
              {showCharactersLeft &&
                !(
                  currentItemComponent.props.inputType === "password" ||
                  currentItemComponent.props.inputType === "email" ||
                  currentItemComponent.props.inputType === "number"
                ) && (
                  <Text as={"body"}>
                    {maxLength - input.length < maxLength
                      ? `${maxLength - input.length} characters left`
                      : `${maxLength} max characters`}
                  </Text>
                )}
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
}
