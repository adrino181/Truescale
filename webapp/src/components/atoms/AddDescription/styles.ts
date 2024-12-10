import {styled} from '@mui/material/styles';
import { Field } from 'formik';
import Input from '../Input';
import { Plus } from '@emotion-icons/bootstrap/Plus';

export const addMoreText = styled('div')(({theme}) => ({
	'& button': {
		color: theme.palette.primary.main,
		textDecoration: 'underline',
		fontSize: theme.typography.body1,
		border: 'none',
		backgroundColor: 'transparent',
		padding: 0,
		cursor: 'pointer',
		fontWeight: theme.typography.fontWeightMedium,
	}
}))

export const Fieldgroup = styled('div')<{ areaName: string; hasError: boolean }>(({areaName, hasError, theme}) => ({
	gridArea: areaName,
	display: 'flex',
	flexFlow: 'column nowrap',
	"& label": {
		marginBottom: theme.spacing(1)
	},
	marginBottom: theme.spacing(3)
}));

export const FieldWrapper = styled('div')(({theme}) => ({
	display: 'flex',
	flexFlow: 'column nowrap',
	justifyContent: 'center',
	width: '100%',
	backgroundColor: theme.palette.primary.main,
	position: 'relative',
	height: '75vh',
	overflow: 'auto',
	[theme.breakpoints.up('lg')]: {
		height: '100%',
		padding: theme.spacing(3)
	}
}));

export const FieldContainer = styled('div')`
	padding: 10px 0;
	margin-bottom: 1.5625rem;
`

export const DateContainer = styled('div')`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;

	& > div {
		margin-bottom: 10px;
	}
	font-size: 14px;
	font-weight: bold;
	align-items: center;
	justify-content: center;
	width: 100%;
	overflow: auto;
`;

export const DateInput = styled(Input)`
	padding: 14px 16px;
	border: 1px solid ${({ theme }) => theme.palette.secondary.main};
	border-radius: 4px;
	width: 100%;
	margin: 8px 0;
`;

export const Fields = styled(Field)`
	width: 100%;
	padding: 14px 16px;
	border: 1px solid ${({ theme }) => theme.palette.secondary.main};
`;

export const PlusIcon = styled(Plus)`
	margin-bottom: 4px;
`;