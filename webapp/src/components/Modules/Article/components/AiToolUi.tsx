import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

const AiToolUI = ({ onChange, value }) => {
  return (
    <Box padding=".5rem 1rem" sx={{ borderRadius: "8px" }}>
      <Input
        onChange={onChange}
        value={value}
        multiline
        rows="4"
        disableUnderline
        type="text"
        placeholder="Type your query"
        sx={{ width: "100%" }}
      />
    </Box>
  );
};

export default AiToolUI;
