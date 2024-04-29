import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';

export const HomeScreen = () => {

  const { isLoading, data } = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => getPokemons(),
    staleTime: 1000 * 60 * 60, // 60 mins
  });

  return (
    <View>
      <Text variant='displaySmall'>HomeScreen</Text>

      {
        isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button 
            mode="contained" 
            onPress={() => console.log('Pressed')}>
            Press me
          </Button>
        )
      }
    </View>
  )
}
