import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQueryClient,  } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { FlatList } from 'react-native-gesture-handler';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  // This is the traditional form of an HTTP request
  // const { isLoading, data: pokemons } = useQuery({
  //   queryKey: ['pokemon'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60, // 60 mins
  // });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemon', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 60 mins
    queryFn: async( params ) => {
      const pokemons = await getPokemons( params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });
      
      return pokemons; 
    },
    getNextPageParam: ( lastPage, pages ) => pages.length,
  });
  
  return (
    <View style={ globalTheme.globalMargin }>
      <PokeballBg style={ styles.imgPosition } />



      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={ (pokemon, index) => `${pokemon.id}-${ index }` }
        numColumns={2}
        style={{paddingTop: top + 20,}}
        ListHeaderComponent={() => (
          <Text variant='displayMedium'>Pokédex</Text>
        )}
        renderItem={ ({item}) => <PokemonCard pokemon={item}/>}
        onEndReachedThreshold={ 0.6 }
        onEndReached={ () => fetchNextPage() }
        showsVerticalScrollIndicator={ false }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  }
});