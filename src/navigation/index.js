import SCREENS from "../screens/tabs";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Feather} from '@expo/vector-icons';
import {COLORS} from "../constants";
import screens from "../commons/tabMenus";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={SCREENS.HOME}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 90,
                    // paddingBottom: 1,
                    paddingTop: 10
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                },
                tabBarIconStyle: {
                    height: 30,
                },
                tabBarItemStyle: {
                    justifyContent: 'center'
                }
            }}
        >
            {screens.map(({ name, component, icon }) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        title: name,
                        tabBarIcon: ({ focused }) => (
                            <Feather
                                name={icon}
                                size={24}
                                color={focused ? COLORS.BLACK : COLORS.GRAY_DARK}
                            />
                        ),
                        tabBarActiveTintColor: COLORS.BLACK,
                        tabBarInactiveTintColor: COLORS.GRAY_DARK,
                    }}
                />
            ))}
        </Tab.Navigator>
    )
}

export {TabNavigator}