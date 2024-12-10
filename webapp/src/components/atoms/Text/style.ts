import styled from '@emotion/styled';
import Link from 'next/link';

export const Heading1 = styled.h1`
	${props => props.theme.typography.h1}
	margin: 0;
	padding: 0;
`;

export const Heading2 = styled.h2`
	${props => props.theme.typography.h2}
	margin: 0;
	padding: 0;
`;

export const Heading3 = styled.h3`
	${props => props.theme.typography.h3}
	margin: 0;
	padding: 0;
`;

export const Heading4 = styled.h4`
	${props => props.theme.typography.h4}
	margin: 0;
	padding: 0;
`;

export const Heading5 = styled.h5`
	${props => props.theme.typography.h5}
	margin: 0;
	padding: 0;
`;

export const Heading6 = styled.h6`
	${props => props.theme.typography.h6}
	margin: 0;
	padding: 0;
`;

export const SubTitle = styled.p`
	margin: 0;
	padding: 0;
`;

export const Body = styled.p<{ variant: number }>`
	${({ theme, variant }) =>
		variant === 2 ? theme.typography.body2 : theme.typography.body1}
	margin: 0;
	padding: 0;
`;
export const Caption = styled.div`
	${props => props.theme.typography.caption}
`;

export const Overline = styled.div`
	${props => props.theme.typography.overline}
	text-transform: uppercase;
	margin-bottom: 2rem;

	&::after {
		content: '';
		display: block;
		width: 5ch;
		height: 0.25rem;
		margin-top: 0.75rem;
		background: currentColor;
	}
`;

export const Action = styled(Link)`
	margin: 0;
	padding: 0;
	${props => props.theme.typography.action}
	&.action-link-icon {
		display: flex;
		align-items: center;
	}
	:active,
	:hover,
	:focus {
		color: ${({ theme }) => theme.palette.primary.eucalyptus};
		text-decoration: none;
	}
`;
export const Label = styled.label`
	${props => props.theme.typography.action}
	margin: 0;
	padding: 0;
`;

export const SubLabel = styled.p`
	margin: 0;
	padding: 0;
	${props => props.theme.typography.caption}
`;

export const NotificationCounter = styled.span`
	${props => props.theme.typography.notificationCounter}
`;

export const body1Bold = styled.span`
	${props => props.theme.typography.body1Bold}
`;

export const ErrorMessage = styled.p`
	margin: 0;
	padding: 0;
	${props => props.theme.typography.action};
	color: ${({ theme }) => theme.palette.other.error};
	margin-bottom: ${({ theme }) => theme.utils.rem(15)};
`;

export const UnorderedList = styled.ul`
	${props => props.theme.typography.unorderedList}
	margin: 0 0 0 ${({ theme }) => theme.utils.rem(24)};
	padding: 0;
`;
