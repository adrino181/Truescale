import Select from "@/components/Blocks/MultiSelect";
import { useEffect, useState } from "react";
import { supabase } from "@/pages/api/fetchData";
import { useTheme } from "@mui/styles";

type TagType = {
  label: string;
  value: string;
  color?: string;
};
const INITIAL_OPTIONS = [
  { value: "tag-402", label: "SAAS" },
  { value: "tag-401", label: "B2B" },
  { value: "tag-400", label: "D2C" },
  { value: "tag-403", label: "MRR" },
  { value: "tag-403", label: "ARR" },
];

const TagEditor = ({ theme, onChange, selected }) => {
  const [tagName, setTagName] = useState(null);
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  // useEffect(() => {
  //   //fetchTags();
  //   const getData = setTimeout(() => {
  //     if (!tagName) {
  //       setOptions(INITIAL_OPTIONS);
  //     } else {
  //       supabase
  //         .rpc("search_tags", {
  //           industry_term: tagName,
  //         })
  //         .then((res) => {
  //           const { data: tags } = res;
  //           if (tags && tags.length) {
  //             let resultTag = tags.map((item) => ({
  //               label: item.name,
  //               value: item.code,
  //             }));
  //             setOptions(resultTag);
  //           }
  //         });
  //     }
  //   }, 500);

  //   return () => clearTimeout(getData);
  // }, [tagName]);

  const promiseOptions = (inputValue: string) =>
    new Promise<TagType[]>((resolve) => {
      if (!inputValue) {
        resolve(INITIAL_OPTIONS);
      }
      setTimeout(() => {
        supabase
          .rpc("search_tags", {
            industry_term: inputValue,
          })
          .then((res) => {
            const { data: tags } = res;
            if (tags && tags.length) {
              resolve(
                tags.map((item) => ({
                  label: item.name,
                  value: item.code,
                }))
              );
            } else {
              resolve([]);
            }
          });
      }, 1000);
    });

  return (
    <Select
      muiTheme={theme}
      onInputChange={(e) => setTagName(e)}
      onChange={onChange}
      promiseOptions={promiseOptions}
      selected={selected}
      colors={{
        primary25: theme.palette.secondary.alternate,
        neutral0: theme.palette.tertiary.main,
        neutral10: theme.palette.secondary.main,
        primary: theme.palette.secondary.main,
        neutral5: "red",
        neutral20: theme.palette.secondary.main,
        neutral80: theme.palette.text.primary,
      }}
      isMulti
    />
  );
};

export default TagEditor;
