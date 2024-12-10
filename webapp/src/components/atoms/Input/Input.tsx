import React from 'react';

import * as S from './styles';
interface iInput {
	[key: string]: unknown | string;
}
const Input: React.FC<iInput> = props => {
	return <S.Input {...props} />;
};
export default Input;
