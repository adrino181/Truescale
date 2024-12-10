import React, { MouseEventHandler } from "react";
import ViewEye from "../../svg/ViewEye.svg";
import Clap from "@/components/svg/Clap.svg";
import CommentIcon from "../../svg/CommentIcon.svg";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
type IconTypes = "like" | "comment" | "view" | "share";

export interface ButtonActionItem {
  buttonSlug: string;
  action?: MouseEventHandler;
  label?: string | number;
  active?: string;
  type?: 'lhs' | 'rhs';
}
interface ActionBarProp {
  button: Array<IconTypes>;
  buttonAction?: Array<ButtonActionItem>;
}

const ClapIcon = styled(Clap)((props) => ({
  "& > g >  .Clap_svg__clap_hand2": {
    stroke: props.isActive ? "" : "#F2D65E",
    fill: props.isActive ? "#F2D65E" : "",
  },
  "& > g > .Clap_svg__clap_hand1": {
    stroke: props.isActive ? "" : "#F2D65E",
    fill: props.isActive ? "#F2D65E" : "",
  },
  "&:hover > g >  .Clap_svg__clap_hand2": {
    transform: !props.isActive && "skew(-5deg, -5deg)",
  },
  "&:hover > g > .Clap_svg__clap_hand1": {
    fill: "#F2D65E",
    transform: !props.isActive && "skewX(5deg)",
    transition: "all 1s ease",
  },
  "&:hover > g > .Clap_svg__clap_misc1": {
    fill: "#F2D65E",
  },
  "&:hover > g > .Clap_svg__clap_misc2": {
    fill: "#F2D65E",
  },
  "&:hover > g > .Clap_svg__clap_misc3": {
    fill: "#F2D65E",
  },
  "& > g > .Clap_svg__clap_misc1": {
    fill: props.isActive ? "#F2D65E" : "",
  },
  "& > g > .Clap_svg__clap_misc2": {
    fill: props.isActive ? "#F2D65E" : "",
  },
  "& > g > .Clap_svg__clap_misc3": {
    fill: props.isActive ? "#F2D65E" : "",
  },
}));

const ICONS = [
  {
    buttonSlug: "like",
    icon: ClapIcon,
  },
  {
    buttonSlug: "comment",
    icon: CommentIcon,
  },
  {
    buttonSlug: "view",
    icon: ViewEye,
  },
  {
    buttonSlug: "share",
    icon: ViewEye,
  },
];


const LeftHandSide = ({ item }: { item: ButtonActionItem }) => (
  <>
    <IconButton
      key={item?.buttonSlug}
      aria-label={item?.buttonSlug}
      onClick={item?.action}
      disabled={!item.action}
    >
      {item?.buttonSlug === "like" ? (
        <ClapIcon isActive={item.active} />
      ) : item?.buttonSlug === "comment" ? (
        <CommentIcon />
      ) : item?.buttonSlug === "view" ? (
        <ViewEye />
      ) : (
        <></>
      )}
    </IconButton>
    {item.label || item.label === 0 ? (
      <Typography
        variant="body2"
        sx={{ ml: 1, position: "relative" }}
        color="text.secondary"
      >
        {item.label}
      </Typography>
    ) : (
      <></>
    )}
  </>
)

const RightHandSide = ({ item }: { item: ButtonActionItem }) => (
  <>
    <Button
      color="secondary"
      sx={{ textTransform: "none" }}
      onClick={item.action}
    >
      {item.label} {item.buttonSlug}
    </Button>
  </>)


const getIcon = (_name: string): JSX.Element =>
  ICONS.find((i) => i.buttonSlug === _name)?.icon || <></>;

const ActionBar = ({ buttonAction }: ActionBarProp) => {

  const modifierData = React.useMemo(() => {
    let initialValue: { lhs: JSX.Element[], rhs: JSX.Element[] } = { lhs: [], rhs: [] };
    if (!buttonAction) {
      return initialValue;
    }
    return [...(buttonAction || [])].reduce((prev, item) => {
      let newClone = { ...prev };
      if (item.type === 'rhs') {
        newClone.rhs.push(<RightHandSide item={item} />)
      } else {
        newClone.lhs.push(<LeftHandSide item={item} />)
      }
      return newClone
    }, initialValue)
  }, [buttonAction])

  return (
    <Box sx={{ display: "flex", zIndex: 1, position: 'relative', justifyContent: "space-between" }}>
      <Stack
        direction="row"
        justifyContent="start"
        alignItems="center"
        spacing={0.5}
      >
        {modifierData.lhs}
        {/* {buttonData} */}
      </Stack>

      <Stack
        direction="row"
        justifyContent="start"
        alignItems="center"
        spacing={0.5}
      >
        {modifierData.rhs}
      </Stack>
    </Box>
  );
};

export default ActionBar;
