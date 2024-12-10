import { useState } from "react";
import { POST_TYPE_MAPPING } from "@/constants/index";
import Select from "@/components/Blocks/MultiSelect";
type TagType = {
  label: string;
  value: string | number;
};
const INITIAL_OPTIONS: TagType[] = [
  { value: POST_TYPE_MAPPING["POST_PUBLIC"], label: "Post in Pubilc" },
  { value: POST_TYPE_MAPPING["POST_PRIVATE"], label: "Post to Listeners Only" },
  { value: POST_TYPE_MAPPING["POST_PREMIUM"], label: "Make it Premium" },
];

const ChoosePostType = ({ theme, onChange, selected }) => {
  const [tagName, setTagName] = useState(null);
  const [options, setOptions] = useState<TagType[]>(INITIAL_OPTIONS);
  const promiseOptions = async (inputValue: string) =>
    new Promise<TagType[]>((resolve) => {
      resolve(INITIAL_OPTIONS);
    });

  return (
    <Select
      muiTheme={theme}
      onInputChange={(e) => setTagName(e)}
      onChange={onChange}
      selected={selected || INITIAL_OPTIONS[0]}
      promiseOptions={promiseOptions}
      colors={{
        primary25: theme.palette.secondary.alternate,
        neutral0: theme.palette.tertiary.main,
        primary: theme.palette.secondary.main,
        neutral5: "red",
        neutral20: theme.palette.secondary.main,
        neutral80: theme.palette.text.primary,
      }}
      isMulti={false}
    />
  );
};

export default ChoosePostType;
