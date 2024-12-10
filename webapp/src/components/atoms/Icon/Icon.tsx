import React from 'react';

import * as S from './styles';

interface iIcon {
	children: React.ReactNode;
	marginLocation?: string;
}

const Icon: React.FC<iIcon & React.PropsWithChildren> = ({
	marginLocation,
	children,
}: iIcon) => {
	return <S.Icon where={marginLocation}>{children}</S.Icon>;
};

export default Icon;
