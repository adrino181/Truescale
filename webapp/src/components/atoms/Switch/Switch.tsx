import * as S from './styles'

interface Props {
    id: string;
    name: string;
}

export default function Switch({
    id,
    name
}: Props){
    return (
        <S.Switch>
            <S.HiddenCheckbox type='checkbox' id={id} name={name} />
            <S.SwitchSlider />
        </S.Switch>
    )
}