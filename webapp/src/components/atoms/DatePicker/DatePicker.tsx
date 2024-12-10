import { ChangeEvent, useEffect, useState } from 'react';
import * as S from './styles';
import {
	CalendarEvent,
	CaretLeftFill,
	CaretRightFill,
} from 'emotion-icons/bootstrap';
import Text from '../Text';

interface Props {
	id: string;
	name: string;
}

const DaysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const LDaysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const DaysName = [
	'SUNDAY',
	'MONDAY',
	'TUESDAY',
	'WEDNESDAY',
	'THURSDAY',
	'FRIDAY',
	'SATURDAY',
];

const Months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const AnchorDays = {
	'1900': 3,
	'2000': 2,
	'2100': 0,
	'2200': 5,
};

const leapYearDoomsDays = [4, 29, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];
const nonleapYearDoomsDays = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];

export default function DatePicker({ id, name }: Props) {
	const currDate = new Date();
	const dateRgx = /^(\d{4})-(0[1-9]|1[012])-(0[0-9]|[12][0-9]|3[01])$/;
	const [year, setYear] = useState(currDate.getFullYear());
	const [month, setMonth] = useState(currDate.getMonth());
	const [day, setDay] = useState(currDate.getDay());
	const [fullDate, setFullDate] = useState(
		`${currDate.getFullYear()}-${
			currDate.getMonth() < 10
				? '0' + (currDate.getMonth() + 1)
				: currDate.getMonth() + 1
		}-${
			currDate.getDate() < 10 ? '0' + currDate.getDate() : currDate.getDate()
		}`,
	);
	const [openPicker, setOpenPicker] = useState(false);
	const [extraDays, setExtraDays] = useState(0);

	function isLeapYear() {
		return year % 4 === 0 || year % 100 === 0 || year % 400 === 0;
	}

	function onChangeYear(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		const tempYearRgx = /\d{4}/;
		let temp = '';

		if (tempYearRgx.test(value)) {
			temp = fullDate.replace(/^\d{4}/, value);
			setFullDate(temp);
			setYear(Number.parseInt(value));
		}
	}

	function onChangeMonth(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		const tempMonthRgx = /0[1-9]|1[0-2]/;
		let temp = '';

		if (tempMonthRgx.test(value)) {
			temp = fullDate.replace(/(?<=-)0[1-9]|1[0-2](?=-)/, value);
			setFullDate(temp);
			setMonth(Number.parseInt(value) - 1);
		}
	}

	function onChangeDate(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		const tempDateRgx = /[012][1-9]|3[01]/;
		let temp = '';
		if (tempDateRgx.test(value)) {
			temp = fullDate.replace(/[012][1-9]$|3[01]$/, value);
			setFullDate(temp);
			setDay(Number.parseInt(value));
		}
	}

	function onClickCalendarIcon() {
		setOpenPicker(!openPicker);
	}

	function onClickMonthChevronLeft() {
		if (month - 1 > -1) {
			setMonth(month - 1);
		} else {
			setYear(year - 1);
			setMonth(11);
		}
	}

	function onClickMonthChevronRight() {
		if (month + 1 < 12) {
			setMonth(month + 1);
		} else {
			setYear(year + 1);
			setMonth(0);
		}
	}

	useEffect(() => {
		function calculateDoomsday() {
			const last2NumsYear = Number.parseInt(year.toString().substring(2, 4));
			let step1 = last2NumsYear;
			step1 = Math.floor(step1 / 12);
			let step2 = last2NumsYear - step1 * 12;
			let step3 = Math.floor(step2 / 4);
			let anchorDay = 0;
			Object.keys(AnchorDays).forEach((century, i) => {
				if (
					Number.parseInt(century) <= year &&
					Number.parseInt(century) + 99 >= year
				) {
					anchorDay = AnchorDays[century as keyof typeof AnchorDays];
				}
			});
			let step4 = step1 + step2 + step3 + anchorDay;
			let step5 = step4 % 7;
			let doomsDay = 0;
			if (year % 4 === 0 || year % 100 === 0 || year % 400 === 0) {
				doomsDay = leapYearDoomsDays[month];
			} else {
				doomsDay = nonleapYearDoomsDays[month];
			}

			if (doomsDay % 7 > step5) {
				if (7 + step5 + 1 - (doomsDay % 7) === 7) {
					setExtraDays(0);
					return;
				}
				setExtraDays(7 + step5 + 1 - (doomsDay % 7));
			} else {
				if (7 + step5 + 1 - (doomsDay % 7) === 7) {
					setExtraDays(0);
					return;
				}
				setExtraDays(step5 + 1 - (doomsDay % 7));
			}
		}
		calculateDoomsday();
		let currentdaysinmonths = DaysInMonths;
		if (year % 4 === 0 || year % 100 === 0 || year % 400 === 0) {
			currentdaysinmonths = LDaysInMonths;
		}
		if (currentdaysinmonths[month] < day) {
			setDay(currentdaysinmonths[month]);
		}
	}, [fullDate, year, month, day]);

	return (
		<S.Container>
			<S.DateTextInputMain>
				<S.DateTextInputRow>
					<S.DateTextInput4ch
						type="text"
						onChange={onChangeYear}
						maxLength={4}
						pattern="\d{4}"
						placeholder={'yyyy'}
					/>
					<span>/</span>
					<S.DateTextInput2ch
						type="text"
						onChange={onChangeMonth}
						maxLength={2}
						placeholder={'mm'}
						value={month < 9 ? '0' + (month + 1) : month + 1}
					/>
					<span>/</span>
					<S.DateTextInput2ch
						type="text"
						onChange={onChangeDate}
						maxLength={2}
						placeholder={'dd'}
						value={day < 10 ? '0' + day : day}
					/>
				</S.DateTextInputRow>
				<CalendarEvent size={20} onClick={onClickCalendarIcon} />
			</S.DateTextInputMain>
			{openPicker && (
				<S.PickerContainer>
					<S.PickerMonthContainer>
						<CaretLeftFill size={25} onClick={onClickMonthChevronLeft} />
						<Text as={'h4'}>
							{Months.map((value, index) => {
								if (month === index) {
									return value;
								}
							})}{' '}
							{year}
						</Text>
						<CaretRightFill size={25} onClick={onClickMonthChevronRight} />
					</S.PickerMonthContainer>
					<S.PickerDayNameGrid>
						{DaysName.map(dayname => (
							<S.PickerDayNameGridContainer key={dayname}>
								<Text as={'body2'}>{dayname.slice(0, 2)}</Text>
							</S.PickerDayNameGridContainer>
						))}
					</S.PickerDayNameGrid>
					<S.PickerDaysGrid>
						{[...Array(42)].map((_, i) => {
							let currentdaysinmonths = DaysInMonths;
							if (isLeapYear()) {
								currentdaysinmonths = LDaysInMonths;
							}
							if (extraDays > i) {
								return (
									<S.NOTDayNumberTextContainer
										key={i}
										onClick={() => {
											if (month === 0) {
												setMonth(11);
												setDay(currentdaysinmonths[11] - extraDays + i + 1);
												setYear(year - 1);
												return;
											}
											setMonth(month - 1);
											setDay(
												currentdaysinmonths[month - 1] - extraDays + i + 1,
											);
										}}
									>
										<Text as={'body2'}>
											{currentdaysinmonths[month - 1 < 0 ? 11 : month - 1] -
												extraDays +
												i +
												1}
										</Text>
									</S.NOTDayNumberTextContainer>
								);
							}
							if (
								i <= currentdaysinmonths[month] + extraDays &&
								i - extraDays === day - 1
							) {
								return (
									<S.DayNumberTextContainerSelected key={i}>
										<Text as={'body2'}>{i - extraDays + 1}</Text>
									</S.DayNumberTextContainerSelected>
								);
							}
							if (i < currentdaysinmonths[month] + extraDays) {
								return (
									<S.DayNumberTextContainer
										key={i}
										onClick={() => {
											setDay(i - extraDays + 1);
										}}
									>
										<Text as={'body2'}>{i - extraDays + 1}</Text>
									</S.DayNumberTextContainer>
								);
							}
							if (extraDays < i) {
								return (
									<S.NOTDayNumberTextContainer
										key={i}
										onClick={() => {
											if (month === 11) {
												setMonth(0);
												setDay(currentdaysinmonths[0] - extraDays + i + 1);
												setYear(year + 1);
												return;
											}
											setMonth(month + 1);
											setDay(
												Math.abs(currentdaysinmonths[month] - i + extraDays) +
													1,
											);
										}}
									>
										<Text as={'body2'}>
											{Math.abs(currentdaysinmonths[month] - i + extraDays) + 1}
										</Text>
									</S.NOTDayNumberTextContainer>
								);
							}
						})}
					</S.PickerDaysGrid>
				</S.PickerContainer>
			)}
			<S.HiddenDatePicker
				id={id}
				name={name}
				type="date"
				value={dateRgx.test(fullDate) ? fullDate : ''}
				defaultValue={dateRgx.test(fullDate) ? fullDate : ''}
			/>
		</S.Container>
	);
}
