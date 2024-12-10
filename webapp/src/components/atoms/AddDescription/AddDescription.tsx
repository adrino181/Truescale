import React, { useState } from 'react';
import Text from '../Text';
import * as S from './styles';
import Field from '@/components/organisms/FormBuilder/Field';

const AddDescription = () => {
	const [showFields, setShowFields] = useState(false);
	const [seasonalDescriptions, setSeasonalDescriptions] = useState<any[]>([]);

	const handleAddDescription = () => {
		setShowFields(true);
		const index = seasonalDescriptions.length + 1;
		const from = {
			id: `field-from-${index}`,
			type: 'date',
			name: `startAtUtc-${index}`,
			formikName: `seasonalInformation[${index}].startAtUtc`,
			optional: true,
			component: {
				name: 'Text',
				props: {
					label: {
						type: 'text',
						content: 'From',
					},
				},
			},
		};
		const to = {
			id: `field-to-${index}`,
			type: 'date',
			name: `endAtUtc-${index}`,
			formikName: `seasonalInformation[${index}].endAtUtc`,
			optional: true,
			component: {
				name: 'Text',
				props: {
					label: {
						type: 'text',
						content: 'To',
					},
				},
			},
		};

		const title = {
			id: `field-title-${index}`,
			type: 'input-text',
			name: `seasonalName-${index}`,
			formikName: `seasonalInformation[${index}].seasonalName`,
			optional: true,
			component: {
				name: 'Text',
				props: {
					label: {
						type: 'text',
						content: 'Title',
					},
					placeholder: {
						type: 'text',
						content: 'E.g. Summer seasons',
					},
					hintText: {
						type: 'text',
						content: '100 words max',
					},
				},
			},
			validation: [
				{
					rule: 'maxCharacterLimit',
					params: {
						length: 100,
					},
				},
			],
		};

		const description = {
			id: `field-seasonalDesc-${index}`,
			type: 'text-area',
			name: `seasonalDesc-${index}`,
			formikName: `seasonalInformation[${index}].description`,
			optional: true,
			component: {
				name: 'Text',
				props: {
					label: {
						type: 'text',
						content: 'Description',
					},
					placeholder: {
						type: 'text',
						content:
							'E.g. Over Summer, Oasis Luxury Lodge customers can enjoy the infamous inflatable obstacle course on the Eastern Cove or take a tour to the nearby caves which can only be accessed during the Summer. ',
					},
					hintText: {
						type: 'text',
						content: '60 words max',
					},
				},
			},
		};

		const fields = {
			from,
			to,
			title,
			description,
		};
		setSeasonalDescriptions(prevDescriptions => [...prevDescriptions, fields]);
	};

	return (
		<>
			{!showFields && (
				<S.addMoreText onClick={handleAddDescription}>
					<button type="button">+ Add more seasonal descriptions</button>
				</S.addMoreText>
			)}

			{showFields && (
				<>
					{seasonalDescriptions.map((description, i) => (
						<React.Fragment key={description.id}>
							<S.FieldContainer>
								<Text as="h4" htmlFor={`title${i}`}>
									Seasonal descriptions (optional)
								</Text>
							</S.FieldContainer>

							<S.DateContainer>
								<div>
									<Field
										key={`${description.from.id}`}
										item={description.from}
									/>
								</div>
								<div>
									<Field key={`${description.to.id}`} item={description.to} />
								</div>
							</S.DateContainer>
							<S.FieldContainer>
								<Field
									key={`${description.title.id}`}
									item={description.title}
								/>
								<Field
									key={`${description.description.id}`}
									item={description.description}
								/>
							</S.FieldContainer>
						</React.Fragment>
					))}

					<S.addMoreText onClick={handleAddDescription}>
						<button type="button">+ Add more seasonal descriptions</button>
					</S.addMoreText>
				</>
			)}
		</>
	);
};

export default AddDescription;
