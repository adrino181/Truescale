import styled from '@emotion/styled';
import Text from '@/components/atoms/Text';
import { Cross } from '@emotion-icons/entypo/Cross';

interface ContainerDefaultStyles {
	width: string;
	height: string;
	border: string;
	borderRadius: string;
	display: string;
	flexFlow: string;
	alignItems: string;
	justifyContent: string;
	textAlign: string;
	backgroundColor: string;
	margin: string;
}

interface LabelDefaultStyles {
	color: string;
}

export const DeselectorLabel = styled(Text)<{ defaultLabel: LabelDefaultStyles }>`
	margin: 0 0.75rem;
	font-weight: bold;
	color: inherit;
`;

export const Container = styled.div<{
	defaultStyles: ContainerDefaultStyles;
}>`
	border: 2px solid ${({ theme }) => theme.palette.neutral.charcoal_20};
	border-radius: ${({ theme }) => theme.utils.rem(14)};
	margin: ${({ theme }) => theme.utils.rem(2)};
	display: flex;
	align-items: center;
	padding: '25px',
	background-color: ${({ theme }) => theme.palette.neutral.white};
	color: ${({ theme }) => theme.palette.neutral.onyx};
	&:hover,
	&:active,
	&:focus {
		background-color: ${({ theme }) => theme.palette.eucalyptus.eucalyptus10};
		border: 2px solid ${({ theme }) => theme.palette.eucalyptus.eucalyptus50};
	}
`;

export const CrossIcon = styled(Cross)`
	height: 1rem;
	margin-right: ${({ theme }) => theme.utils.rem(0.5)};
	margin-left: ${({ theme }) => theme.utils.rem(-0.5)};
	vertical-align: bottom;
	color: ${({ theme }) => theme.palette.neutral.charcoal_20}
`;