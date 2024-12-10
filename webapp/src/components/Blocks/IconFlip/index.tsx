import React from 'react';
import { Popper, Theme } from "@mui/material";
import IconButton from "@mui/material/IconButton"

interface ButtonSlugInterface {
  buttonSlug: String,
  action: () => void,
  label: String,
  active: Boolean,
  icon: JSX.Element
}

type IconsFlipTypes = {
  icon: React.ReactNode,
  buttonSlug: ButtonSlugInterface[],
  theme: Theme
}

const IconFlip = ({ icon, buttonSlug, theme }: IconsFlipTypes) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleAnchor = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  }
  const open = Boolean(anchorEl)
  const id = open ? 'popover-preview' : undefined;
  return (
    <>
      <IconButton
        sx={{
          height: '2.2rem',
          width: '2.2rem',
          minHeight: '2.2rem',
          minWidth: '2.2rem',
        }}
        onClick={handleAnchor}
      >
        {icon}
      </IconButton>
      <Popper sx={{ zIndex: 2, }} disablePortal={true} open={open} anchorEl={anchorEl} >
        <div style={{ backgroundColor: theme.palette.secondary.main, minWidth: '100px' }} >
          {buttonSlug.map(item => (
            <IconButton
              sx={{
                height: '2.4rem',
                width: '2.4rem',
                minHeight: '2.4rem',
                minWidth: '2.4rem',
              }}
              onClick={item.action}
              key={item.buttonSlug}
            >
              {item.icon}
            </IconButton>
          ))}
        </div>
      </Popper>
    </>
  )
}

export default IconFlip;

