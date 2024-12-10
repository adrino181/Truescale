import React, { useState } from 'react';
import Text from '../Text';
import * as S from './styles';
import Toggle from '../Toggle';

const InputToggle: React.FC = () => {
	const [addHours, setAddHours] = useState<boolean>(false);
	const [inputList, setInputList] = useState<
		{ id: number; opening: string; closing: string }[]
	>([{ id: Math.random(), opening: '', closing: '' }]);
	const [addRow, setAddRow] = useState<boolean>(false);
	const [newDateRow, setNewDateRow] = useState<
		{ id: number; opening: string; closing: string; toggle: boolean }[]
	>([{ id: Math.random(), opening: '', closing: '', toggle: false }]);

	const handleDateRow = (id: number) => {
		const updatedNewDateRow = newDateRow.filter(d => d.id !== id);
		setNewDateRow(updatedNewDateRow);
	};

	const handleDeleteRow = (id: number) => {
		if (inputList.length < 1) return;
		const newFields = inputList.filter(item => item.id !== id);
		setInputList(newFields);
	};

	const handleAddHours = () => {
		setAddHours(!addHours);
		setInputList(prevState => [
			...prevState,
			{ id: Math.random(), opening: '', closing: '' },
		]);
	};

	const handleAddRow = () => {
		setAddRow(!addRow);
		setNewDateRow(prevState => [
			...prevState,
			{ id: Math.random(), opening: '', closing: '', toggle: false },
		]);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
	) => {
		const inputTarget = e.target.name;
		const inputValue = e.target.value;
		let updatedList = inputList.map(i => {
			let updateInput = {
				id: i.id,
				opening: i.opening,
				closing: i.closing,
			};
			if (i.id === id) {
				if (inputTarget === 'opening') {
					updateInput.opening = inputValue;
				}
				if (inputTarget === 'closing') {
					updateInput.closing = inputValue;
				}
			}
			return updateInput;
		});
		setInputList(updatedList);
	};

	const handleRowChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
	) => {
		const inputTarget = e.target.name;
		const inputValue = e.target.value;
		let updatedList = newDateRow.map(i => {
			let updateInput = {
				id: i.id,
				opening: i.opening,
				closing: i.closing,
				toggle: i.toggle,
			};
			if (i.id === id) {
				if (inputTarget === 'opening') {
					updateInput.opening = inputValue;
				}
				if (inputTarget === 'closing') {
					updateInput.closing = inputValue;
				}
			}
			return updateInput;
		});
		setNewDateRow(updatedList);
	};

	const handleToggle = (id: number) => {
		const updatedNewDateRow = newDateRow.map(data => {
			if (id === data.id) {
				return {
					id: data.id,
					opening: data.opening,
					closing: data.closing,
					toggle: !data.toggle,
				};
			}
			return data;
		});
		setNewDateRow(updatedNewDateRow);
	};

	return (
		<>
			<S.HolidayHoursText as="h4">Holiday Business Hours</S.HolidayHoursText>
			<S.Container>
				<S.ContentWrapper>
					{newDateRow.map(d => (
						<S.ContentWrapperItem key={d.id}>
							<S.DatePicker
								type="date"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									handleRowChange(e, d.id)
								}
							></S.DatePicker>
							<S.SwitchWrapper>
								<S.Label>
									<Toggle
										defaultChecked={d.toggle}
										handleChange={() => handleToggle(d.id)}
									/>
									<S.Label>
										<Text as="h6">{!d.toggle ? 'Closed' : 'Open'}</Text>
										{!d.toggle && (
											<S.CloseIcon onClick={() => handleDateRow(d.id)} />
										)}
									</S.Label>
								</S.Label>
							</S.SwitchWrapper>
							<S.InputWrapper>
								{d.toggle && (
									<S.InputContainer>
										{inputList.map(i => (
											<S.InputWrapper key={i.id}>
												<label htmlFor="opening-time">
													<S.TimePicker
														type="time"
														id="opening-time"
														name="opening"
														value={i.opening}
														onChange={(
															e: React.ChangeEvent<HTMLInputElement>,
														) => handleInputChange(e, i.id)}
													/>
												</label>
												<S.ToText as="body2">To</S.ToText>
												<label htmlFor="closing-time">
													<S.TimePicker
														type="time"
														id="closing-time"
														name="closing"
														value={i.closing}
														onChange={(
															e: React.ChangeEvent<HTMLInputElement>,
														) => handleInputChange(e, i.id)}
													/>
												</label>

												{inputList.length === 2 ? (
													<S.CloseIcon onClick={() => handleDeleteRow(i.id)} />
												) : null}

												{inputList.length === 1 ? (
													<S.AddHours>
														<S.AddHoursText as="label" onClick={handleAddHours}>
															Add hours
														</S.AddHoursText>
													</S.AddHours>
												) : null}
											</S.InputWrapper>
										))}
									</S.InputContainer>
								)}
							</S.InputWrapper>
						</S.ContentWrapperItem>
					))}
				</S.ContentWrapper>
				<S.AddMore onClick={handleAddRow}>
					<S.PlusIcon size={16} />
					<S.AddHoursText as="label">
						Add another set of holiday business hours
					</S.AddHoursText>
				</S.AddMore>
			</S.Container>
		</>
	);
};

export default InputToggle;
