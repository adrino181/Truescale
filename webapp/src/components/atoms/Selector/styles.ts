import styled from '@emotion/styled';
import Text from '@/components/atoms/Text';
interface ContainerDefaultStyles {
	width: string;
	height: string;
	border: string;
	borderRadius: string;
	display: string;
	flexFlow: string;
	alignItems: string;
	justifyContent: string;
	marginBottom: string;
	textAlign: string;
	backgroundColor: string;
	fontWeight: string;
	focusBorder: string;
}

interface LabelDefaultStyles {
	color: string;
}

export const SelectorLabel = styled(Text)<{ defaultLabel: LabelDefaultStyles }>`
	color: ${props => props.defaultLabel.color};
`;

export const Container = styled.div<{
	defaultStyles: ContainerDefaultStyles;
}>`
	width: ${props => props.defaultStyles.width};
	height: ${props => props.defaultStyles.height};
	border: ${props => props.defaultStyles.border};
	border-radius: ${props => props.defaultStyles.borderRadius};
	display: ${props => props.defaultStyles.display};
	flex-flow: ${props => props.defaultStyles.flexFlow};
	align-items: ${props => props.defaultStyles.alignItems};
	justify-content: ${props => props.defaultStyles.justifyContent};
	margin-bottom: ${props => props.defaultStyles.marginBottom};
	text-align: ${props => props.defaultStyles.textAlign};
	background-color: ${props => props.defaultStyles.backgroundColor};
	font-weight: ${props => props.defaultStyles.fontWeight};
	&:hover,
	&:active,
	&:focus {
		border-color: ${props => props.defaultStyles.focusBorder};
	}
`;
