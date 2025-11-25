import { Text, View } from 'react-native';
import { styles } from '../style/CustomStyle';

const RecipeDetail = ({ route, navigation }) => {
    const { recipe } = route.params;

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{recipe.name}</Text>
        </View>
    );
}

export default RecipeDetail;
