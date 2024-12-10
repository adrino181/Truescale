import {styled} from '@mui/material/styles';
import Text from '../Text';

interface GetStylesProps {
	color?: string;
	backgroundColor: string;
	border?: string;
}

const getStyles = ({ color, backgroundColor, border }: GetStylesProps) => {
	return `
        color: ${color};
        background-color: ${backgroundColor};
        border: ${border};
    `;
};

interface GetVariantProps {
	variant: string;
}

const getVariant = ({ variant }: GetVariantProps) => {
	const base = {
		color: theme.palette.neutral.onyx,
		backgroundColor: 'none',
		border: `${theme.utils.rem(1)} solid
		${theme.palette.neutral.charcoal_20};`,
	};
	let themedBadge = '';
	let themedCircle = '';
	switch (variant) {
		case 'draftPreview':
			themedBadge = `${getStyles({
				...base,
			})}`;
			themedCircle = `${getStyles({
				backgroundColor: 'none',
				border: `${theme.utils.rem(2)} solid
				${theme.palette.tertiary.sea};`,
			})}`;
			break;
		case 'inDraft':
		case 'draftComplete':
			themedBadge = `${getStyles({
				...base,
			})}`;
			themedCircle = `${getStyles({
				backgroundColor: theme.palette.tertiary.sea,
				border: `${theme.utils.rem(2)} solid
				${theme.palette.tertiary.sea};`,
			})}`;
			break;
		case 'sentForReview':
			themedBadge = `${getStyles({
				...base,
			})}`;
			themedCircle = `${getStyles({
				color: theme.palette.other.dark,
				backgroundColor: theme.palette.comms.reviewed,
				border: `${theme.utils.rem(1)} solid
				${theme.palette.comms.reviewed};`,
			})}`;
			break;
		case 'inReview':
		case 'lockedInReview':
			themedBadge = `${getStyles({
				...base,
			})}`;
			themedCircle = `${getStyles({
				color: theme.palette.other.mandatoryRed,
				backgroundColor: theme.palette.neutral.onyx,
				border: `${theme.utils.rem(2)} solid ${theme.palette.neutral.onyx}`,
			})}`;
			break;
		case 'profileDisabled':
		case 'archived':
			themedBadge = `${getStyles({
				color: theme.palette.neutral.charcoal_70,
				backgroundColor: theme.palette.buttons.disabled_light,
				border: 'none',
			})}`;
			themedCircle = `${getStyles({
				backgroundColor: theme.palette.neutral.charcoal_70,
				border: `${theme.utils.rem(2)} solid ${
					theme.palette.neutral.charcoal_70
				}`,
			})}`;
			break;
		case 'live':
		case 'viewableLive':
			themedBadge = `${getStyles({
				...base,
			})}`;
			themedCircle = `${getStyles({
				color: theme.palette.other.dark,
				backgroundColor: theme.palette.comms.success,
				border: `${theme.utils.rem(2)} solid ${theme.palette.comms.success}`,
			})}`;
			break;
		case 'rejected':
		case 'expiringSoon':
		case 'liveHasDraftUpdates':
		case 'hasReviewComments':
		case 'readyForQA':
			themedBadge = `${getStyles({
				...base,
			})}`;
			themedCircle = `${getStyles({
				color: theme.palette.other.dark,
				backgroundColor: theme.palette.comms.alert,
				border: `${theme.utils.rem(2)} solid ${theme.palette.comms.alert}`,
			})}`;
			break;
		default:
			themedBadge = `${getStyles({ ...base })}`;
			themedCircle = `${getStyles({ ...base })}`;
			break;
	}
	return { badge: themedBadge, circle: themedCircle };
};

export const Badge = styled(Text)<{ variant: string }>`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	border-radius: ${props => props.theme.utils.rem(400)};
	padding-inline: ${props => props.theme.utils.rem(12)};
	height: ${props => props.theme.utils.rem(31)};
	max-width: fit-content;
	color: ${props => props.theme.palette.other.onyx};
	${({ variant }) => getVariant({ variant }).badge}
`;

export const Circle = styled.span<{ variant: string }>`
	width: ${props => props.theme.utils.rem(10)};
	height: ${props => props.theme.utils.rem(10)};
	border-radius: 50%;
	margin-right: ${props => props.theme.utils.rem(10)};
	background: ${({ variant }) => getVariant({ variant }).circle};
`;
