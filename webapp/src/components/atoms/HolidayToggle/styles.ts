import styled from '@emotion/styled';
import Text from '../Text';
import Close from '@/components/atoms/Icon/svg/close';
import { Plus } from '@emotion-icons/bootstrap/Plus';
import Input from '../Input';

export const CloseIcon = styled(Close)`
	width: ${({ theme }) => theme.utils.rem(20)};
	height: ${({ theme }) => theme.utils.rem(20)};
	margin-left: ${({ theme }) => theme.utils.rem(32)};
`;

export const PlusIcon = styled(Plus)``;

export const Container = styled.div``;

export const DatePicker = styled(Input)`
	margin-right: ${({ theme }) => theme.utils.rem(32)};
	height: ${({ theme }) => theme.utils.rem(50)};
`;

export const HolidayHoursText = styled(Text)`
	margin-bottom: ${({ theme }) => theme.utils.rem(10)};
`;

export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Label = styled.label`
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.utils.rem(10)};
	cursor: pointer;
`;

export const SwitchWrapper = styled.div`
	margin-right: ${({ theme }) => theme.utils.rem(42)};
	display: flex;
	align-self: start;
	height: ${({ theme }) => theme.utils.rem(50)};
`;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.utils.rem(8)};
`;

export const InputWrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const ToText = styled(Text)`
	margin: 0 ${({ theme }) => theme.utils.rem(14)};
`;

export const AddHours = styled.button`
	background-color: ${({ theme }) => theme.palette.neutral.white};
	border: ${({ theme }) => theme.palette.neutral.white};
	padding: 0;
	margin: ${({ theme }) => theme.utils.rem(6)};
	margin-left: ${({ theme }) => theme.utils.rem(32)};
`;

export const AddMore = styled.button`
	background-color: ${({ theme }) => theme.palette.neutral.white};
	border: ${({ theme }) => theme.palette.neutral.white};
	margin-top: ${({ theme }) => theme.utils.rem(16)};
	color: ${({ theme }) => theme.palette.primary.eucalyptus};
	display: flex;
	align-items: center;
`;

export const AddHoursText = styled(Text)`
	color: ${({ theme }) => theme.palette.primary.eucalyptus};
	&:hover {
		color: ${({ theme }) => theme.palette.primary.emerald};
	}
	text-decoration: underline;
`;

export const SwitchInput = styled.input`
	display: none;
`;

export const TimePicker = styled(Input)`
	${({ theme }) => theme.utils.rem(48)};
`;

export const DayText = styled(Text)`
	margin-bottom: ${({ theme }) => theme.utils.rem(8)};
`;

export const ContentWrapperItem = styled.div`
	display: flex;
	margin-bottom: ${({ theme }) => theme.utils.rem(16)};
`;
