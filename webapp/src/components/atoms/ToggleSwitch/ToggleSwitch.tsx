import React from 'react';
import * as S from './styles';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], weight: '600' });

type ToggleSwitchProps = {
	labels: {
		left: string;
		right: string;
	};
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ labels }) => {
	return (
		<S.ToggleSwitchContainer className={inter.className}>
			<S.ToggleSwitchCheckbox type="checkbox" name="switch" id="switch" />
			<S.ToggleSwitchLabels
				htmlFor="switch"
				data-left={labels.left}
				data-right={labels.right}
			/>
		</S.ToggleSwitchContainer>
	);
};

export default ToggleSwitch;
