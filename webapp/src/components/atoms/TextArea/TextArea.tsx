import React from 'react';

import * as S from './styles';
interface iTextArea {
	[key: string]: unknown | string;
}
const TextArea: React.FC<iTextArea> = props => {
	return <S.TextArea {...props} />;
};
export default TextArea;
