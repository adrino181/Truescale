import React from 'react';

import * as S from './styles';

interface iToggle {
	defaultChecked: boolean;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: React.FC<iToggle> = ({ defaultChecked, handleChange }) => {
	return (
		<S.Label>
			<S.Input
				checked={defaultChecked}
				type="checkbox"
				onChange={handleChange}
			/>
			<S.Switch checked={defaultChecked} />
		</S.Label>
	);
};

export default Toggle;
