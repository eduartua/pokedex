import { useContext } from 'react';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
  style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ({ style }: Props) => {

  const { isDark } = useContext( ThemeContext );

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-dark.png')
    : require('../../../assets/pokeball-light.png')
  return (
    <Image 
      source={ pokeballImg }
      style= {[
        {
          width: 300,
          height: 300,
          opacity: 0.3,
        },
        style,
      ]}
    />
  )
}
