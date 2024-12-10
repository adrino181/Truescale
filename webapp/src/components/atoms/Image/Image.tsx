import React from 'react';

import * as S from './styles';

interface iImage {
	height: number;
	width: number;
	x: number;
	y: number;
	src: string;
	editable?: boolean;
}

const Image: React.FC<iImage> = props => {
	return <S.BackgroundImage {...props} />;
};
export default Image;
