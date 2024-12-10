import React, { ReactNode } from 'react';

import * as S from './styles';

interface BadgeProps {
	variant: string;
	children: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
	return (
		<S.Badge variant={variant} as="caption">
			<S.Circle variant={variant} /> {children}
		</S.Badge>
	);
};

export default Badge;
