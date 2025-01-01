
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {TabNavigator} from "./src/navigation";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <TabNavigator />
                </NavigationContainer>
                <StatusBar />
            </SafeAreaProvider>
        </GestureHandlerRootView>

    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});