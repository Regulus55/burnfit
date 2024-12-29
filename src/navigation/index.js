import SCREENS from "../screens/tabs";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/tabs/HomeScreen";
import {Feather} from '@expo/vector-icons';
import {COLORS} from "../constants";
import CalendarScreen from "../screens/tabs/CalendarScreen";
import LibraryScreen from "../screens/tabs/LibraryScreen";
import MypageScreen from "../screens/tabs/MypageScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName={SCREENS.HOME}>
            <Tab.Screen
                name={SCREENS.HOME}
                component={HomeScreen}
                options={{
                    title: SCREENS.HOME,
                    tabBarIcon: ({focused})=> (
                        <Feather
                            name="home"
                            size={24}
                            color="black"
                            style={{
                                tintColor: focused ? COLORS.BLACK : COLORS.GRAY_LIGHT
                            }}
                        />

                    ),
                    tabBarActiveTintColor: COLORS.BLACK,
                    tabBarInactiveTintColor: COLORS.GRAY_LIGHT,
                }}
            />

            <Tab.Screen
                name={SCREENS.CALENDAR}
                component={CalendarScreen}
                options={{
                    title: SCREENS.CALENDAR,
                    tabBarIcon: ({focused})=> (
                        <Feather
                            name="calendar"
                            size={24}
                            color="black"
                            style={{
                                tintColor: focused ? COLORS.BLACK : COLORS.GRAY_LIGHT
                            }}
                        />

                    ),
                    tabBarActiveTintColor: COLORS.BLACK,
                    tabBarInactiveTintColor: COLORS.GRAY_LIGHT,
                }}
            />

            <Tab.Screen
                name={SCREENS.LIBRARY}
                component={LibraryScreen}
                options={{
                    title: SCREENS.LIBRARY,
                    tabBarIcon: ({focused})=> (
                        <Feather
                            name="bookmark"
                            size={24}
                            color="black"
                            style={{
                                tintColor: focused ? COLORS.BLACK : COLORS.GRAY_LIGHT
                            }}
                        />

                    ),
                    tabBarActiveTintColor: COLORS.BLACK,
                    tabBarInactiveTintColor: COLORS.GRAY_LIGHT,
                }}
            />

            <Tab.Screen
                name={SCREENS.MYPAGE}
                component={MypageScreen}
                options={{
                    title: SCREENS.MYPAGE,
                    tabBarIcon: ({focused})=> (
                        <Feather
                            name="user"
                            size={24}
                            color="black"
                            style={{
                                tintColor: focused ? COLORS.BLACK : COLORS.GRAY_LIGHT
                            }}
                        />

                    ),
                    tabBarActiveTintColor: COLORS.BLACK,
                    tabBarInactiveTintColor: COLORS.GRAY_LIGHT,
                }}
            />
        </Tab.Navigator>
    )
}

export {TabNavigator}