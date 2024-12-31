import SCREENS from "../screens/tabs";
import HomeScreen from "../screens/tabs/HomeScreen";
import CalendarScreen from "../screens/tabs/CalendarScreen";
import LibraryScreen from "../screens/tabs/LibraryScreen";
import MypageScreen from "../screens/tabs/MypageScreen";

const screens = [
  {
    name: SCREENS.HOME,
    component: HomeScreen,
    icon: "home",
  },
  {
    name: SCREENS.CALENDAR,
    component: CalendarScreen,
    icon: "calendar",
  },
  {
    name: SCREENS.LIBRARY,
    component: LibraryScreen,
    icon: "bookmark",
  },
  {
    name: SCREENS.MYPAGE,
    component: MypageScreen,
    icon: "user",
  },
];

export default screens;
