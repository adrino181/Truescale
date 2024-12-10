import styled from '@emotion/styled';
import { defaultConfig as theme } from '@/components/themes/';
import Text from '../Text';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	position: relative;
	margin: 0;
`;

export const HiddenDatePicker = styled.input`
	position: absolute;
	width: 0;
	height: 0;
	opacity: 0;
	border: 0;
	margin: 0;
	padding: 0;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`;

export const DateTextInputMain = styled.span`
	display: flex;
	padding: ${theme.utils.rem(5)};
	border: 1px solid ${theme.palette.other.dark}50;
	border-radius: ${theme.utils.rem(5)};
	align-items: center;
	justify-content: space-between;

	&:focus-within {
		border: 1px solid ${theme.palette.primary.eucalyptus};
	}
`;

export const DateTextInput4ch = styled.input`
	border: 0px;
	width: 4ch;

	&:focus {
		outline: 0px;
	}
	font-family: Monospace;
	font-size: 12pt;
`;

export const DateTextInput2ch = styled.input`
	border: 0px;
	width: 2ch;

	&:focus {
		outline: 0px;
	}
	font-family: Monospace;
	font-size: 12pt;
`;

export const DateTextInputRow = styled.span`
	align-items: center;
	margin-right: ${theme.utils.rem(20)};
`;

export const InvalidText = styled(Text)`
	color: ${theme.palette.other.error};
	font-size: 8pt;
`;

export const PickerContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${theme.utils.rem(20)};
	border: 1px solid ${theme.palette.other.dark}50;
	border-radius: ${theme.utils.rem(15)};

	position: absolute;
	transform: translateY(40px);
	background-color: ${theme.palette.other.light};
	box-shadow: 0 0 ${theme.utils.rem(12)} ${theme.palette.neutral.charcoal_70}80;
`;

export const PickerMonthContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${theme.utils.rem(3)};
`;

export const PickerDayNameGrid = styled.div`
	flex: 1;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	margin-top: ${theme.utils.rem(30)};
`;

export const PickerDayNameGridContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const PickerDaysGrid = styled.div`
	flex: 1;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	margin-top: ${theme.utils.rem(10)};
	border: ${theme.utils.rem(2)} solid ${theme.palette.neutral.charcoal_70};
	border-radius: ${theme.utils.rem(15)};
`;

export const DayNumberTextContainer = styled.div`
	flex: 1;
	display: flex;
	cursor: pointer;
	justify-content: center;
	padding: ${theme.utils.rem(15)};

	&:nth-child(n):nth-child(-n + 6) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(7) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 8):nth-child(-n + 13) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(14) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 15):nth-child(-n + 20) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(21) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 22):nth-child(-n + 27) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(28) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 29):nth-child(-n + 34) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(35) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 36):nth-child(-n + 41) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
`;

export const NOTDayNumberTextContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	padding: ${theme.utils.rem(15)};
	background-color: ${theme.palette.neutral.charcoal_20};
	cursor: pointer;

	&:nth-child(1) {
		border-top-left-radius: ${theme.utils.rem(13)};
	}
	&:nth-child(n):nth-child(-n + 6) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(36) {
		border-bottom-left-radius: ${theme.utils.rem(13)};
	}
	&:nth-child(42) {
		border-bottom-right-radius: ${theme.utils.rem(13)};
	}
	&:nth-child(n + 8):nth-child(-n + 13) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(14) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 15):nth-child(-n + 20) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(21) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 22):nth-child(-n + 27) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(28) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 29):nth-child(-n + 34) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(35) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 36):nth-child(-n + 41) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
`;

export const DayNumberTextContainerSelected = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	padding: ${theme.utils.rem(15)};
	background-color: ${theme.palette.primary.eucalyptus};

	p {
		color: ${theme.palette.neutral.white};
	}

	&:nth-child(1) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-top-left-radius: ${theme.utils.rem(13)};
	}
	&:nth-child(n):nth-child(-n + 6) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(7) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-top-right-radius: ${theme.utils.rem(13)};
	}
	&:nth-child(n + 8):nth-child(-n + 13) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(14) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 15):nth-child(-n + 20) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(21) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 22):nth-child(-n + 27) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(28) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 29):nth-child(-n + 34) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(28) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 29):nth-child(-n + 34) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(35) {
		border-bottom: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
	}
	&:nth-child(n + 36):nth-child(-n + 41) {
		border-right: ${theme.utils.rem(2)} solid
			${theme.palette.neutral.charcoal_70};
		border-bottom-left-radius: ${theme.utils.rem(13)};
	}
`;
