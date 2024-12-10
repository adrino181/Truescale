import React from "react";
import Box from "@mui/material/Box";
import * as S from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import Text from "../Text";

type ImageType = string | undefined;

const Avatar = (
  {
    submitFile,
    initialValue,
  }: {
    submitFile: (imageUrl: ImageType) => void;
    initialValue?: string;
  },
  ref: React.ForwardedRef<any>
) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<ImageType>(initialValue);
  const [error, setError] = React.useState<boolean>(false);
  const handleFileUpload = (e: any) => {
    // Array.from(e).forEach((file, index) => {
    //   const newFile: Photos = {
    //     id: `${file.name}`,
    //     label: file.name,
    //     thumbnail: URL.createObjectURL(file),
    //     sequence: index,
    //     imageFile: file,
    //   };
    //   photos.push(newFile);
    // });
    e.preventDefault();

    for (var i = 0; i < e.target.files.length; i++) {
      var file = e.target.files[i];
      const size = file.size;
      console.log("Size", size / 1000000);
      if (size / 1000000 > 2.5) {
        console.log("size greater than 2.5", size / 1000000);
      }
      var reader = new FileReader();
      reader.onloadend = function () {
        console.log(reader.result);
        const imageData = reader.result?.toString() || "";
        // const imageData = {
        //   id: `${file.name}`,
        //   label: file.name,
        //   thumbnail: URL.createObjectURL(file),
        //   imageFile: file,
        // };
        // console.log("this is imagedata", imageData);
        setImageUrl(imageData);
        submitFile(imageData);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <S.Wrapper>
        {loading ? (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={20} color="primary" />
          </Box>
        ) : imageUrl ? (
          <S.StyledAvatar src={imageUrl} onClick={() => {}} variant="rounded" />
        ) : (
          <></>
        )}
      </S.Wrapper>
      <label htmlFor="contained-file">
        {loading ? (
          <></>
        ) : (
          <input
            accept="image/*"
            id="contained-file"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={handleFileUpload}
            ref={ref}
          />
        )}
        <S.StyledEditIcon color="primary" fontSize="small" />
      </label>
      {error && <Text> Error</Text>}
    </Box>
  );
};

export default React.forwardRef<any, any>(Avatar);
