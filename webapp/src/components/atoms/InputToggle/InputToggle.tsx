import React, { useState } from 'react';
import Text from '../Text';
import * as S from './styles';
import Toggle from '../Toggle';
interface InputToggleProps {
	dayOfWeek?: string;
}

const InputToggle: React.FC<InputToggleProps> = ({ dayOfWeek }) => {
	const [addHours, setAddHours] = useState<boolean>(false);
	const [inputList, setInputList] = useState<
		{ id: number; opening: string; closing: string }[]
	>([{ id: Math.random(), opening: '', closing: '' }]);
	const [newDateRow, setNewDateRow] = useState<
		{ id: number; opening: string; closing: string; toggle: boolean }[]
	>([{ id: Math.random(), opening: '', closing: '', toggle: false }]);

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
		<S.Container>
			<S.DayText as="h6">
				<>{dayOfWeek}</>
			</S.DayText>

			<S.ContentWrapper>
				{newDateRow.map(i => (
					<S.ContentWrapperItem key={i.id}>
						<S.SwitchWrapper key={i.id}>
							<S.Label>
								<Toggle
									defaultChecked={i.toggle}
									handleChange={() => handleToggle(i.id)}
								/>
								<Text as="h6">{!i.toggle ? 'Closed' : 'Open'}</Text>
							</S.Label>
						</S.SwitchWrapper>
						<S.InputWrapper>
							{i.toggle && (
								<S.InputContainer>
									{inputList.map(i => (
										<S.InputWrapper key={i.id}>
											<label htmlFor="opening-time">
												<S.TimePicker
													type="time"
													id="opening-time"
													name="opening"
													value={i.opening}
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														handleInputChange(e, i.id)
													}
												/>
											</label>
											<S.ToText as="body2">To</S.ToText>
											<label htmlFor="closing-time">
												<S.TimePicker
													type="time"
													id="closing-time"
													name="closing"
													value={i.closing}
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														handleInputChange(e, i.id)
													}
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
		</S.Container>
	);
};

export default InputToggle;
