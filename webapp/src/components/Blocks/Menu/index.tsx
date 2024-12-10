import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Typography from "@mui/material/Typography";
const ITEM_HEIGHT = 48;
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ShareIcon from "@mui/icons-material/Share";
function LongMenu({ theme, options }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon color="secondary" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "17ch",
            background: theme.palette.primary.main,
          },
        }}
      >
        {options &&
          options.map((option) => (
            <MenuItem key={option.buttonSlug} onClick={option.action}>
              {option.buttonSlug === "save" ? (
                <TurnedInNotIcon color="secondary" />
              ) : option.buttonSlug === "share" ? (
                <ShareIcon color="secondary" />
              ) : (
                <></>
              )}
              <Typography sx={{ ml: 1 }}>{option.label}</Typography>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}

export default React.memo(LongMenu);
