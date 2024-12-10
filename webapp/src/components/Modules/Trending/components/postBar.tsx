import React from 'react';
import Editor from "@/components/Blocks/Editor"
import { Grid, Box, Button } from "@mui/material"
import { UsePostHook } from "@/components/Modules/Posts/hooks"
const EDITOR_ID = "HOST_PROVIDER";
const PostEditor = ({ handleClose, theme }) => {
  const [editorData, setEditorData] = React.useState();
  const { addPostHandler, writeStatus } = UsePostHook();
  // useEffect(() => {
  //   const editor = new Editor({
  //     id: EDITOR_ID,
  //   });
  //   editor.init();
  // }, [])
  //
  //
  const editorDataChange = (args) => {
    setEditorData(args);
  }

  const handleSubmit = () => {
    if (!editorData?.blocks?.length) {
      return;
    }
    addPostHandler({ blockData: editorData.blocks })
    handleClose();
  }
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
        }}
        maxWidth="lg"
      >
        <Box
          sx={{
            background: "none",
            padding: {
              xs: "0 1rem 0 1rem",
            },
            width: "100%",
          }}
        >
          <Editor
            props={{
              mode: 'POST',
              isEditable: false,
              callback: editorDataChange
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "40px",
            padding: "10px",
            width: "100%",
            textAlign: "right",
            overflow: "hidden",
            left: 0,
            zIndex: 100,
          }}
        >

          <Button
            onClick={handleClose}
            variant="outlined"
            color="error"
            sx={{
              fontSize: "12px",
              marginRight: "20px",
              color: theme.palette.text.primary,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          {/* <Button */}
          {/*   // onClick={publishArticle} */}
          {/*   variant="outlined" */}
          {/*   color="secondary" */}
          {/*   sx={{ */}
          {/*     fontSize: "12px", */}
          {/*     marginRight: "20px", */}
          {/*     color: "white", */}
          {/*     textTransform: "none", */}
          {/*   }} */}
          {/* > */}
          {/*   Document */}
          {/* </Button> */}
          {/* <Button */}
          {/*   // onClick={publishArticle} */}
          {/*   variant="outlined" */}
          {/*   color="secondary" */}
          {/*   sx={{ */}
          {/*     fontSize: "12px", */}
          {/*     marginRight: "20px", */}
          {/*     color: "white", */}
          {/*     textTransform: "none", */}
          {/*   }} */}
          {/* > */}
          {/*   Image */}
          {/* </Button> */}
          <Button
            onClick={handleSubmit}
            color="secondary"
            variant="outlined"
            sx={{
              fontSize: "12px",
              marginRight: "20px",
              textTransform: "none",
              color: theme.palette.text.primary,
            }}
          >
            Post
          </Button>
        </Box>
      </Grid>
    </>
  )
}

export default PostEditor;
