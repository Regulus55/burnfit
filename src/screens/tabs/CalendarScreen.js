import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {COLORS} from "../../constants";

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 현재 활성화된 탭

  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const tabs = [
    {
      id: 0,
      title: "식단",
      count: 0,
      content: "추가 버튼을 눌러\n식단을 기록해주세요",
    },
    {
      id: 1,
      title: "운동",
      count: 0,
      content: "추가 버튼을 눌러\n운동을 기록해주세요",
    },
    {
      id: 2,
      title: "신체",
      count: 0,
      content: "추가 버튼을 눌러\n신체를 기록해주세요",
    },
  ];

  const handleAddButtonPress = () => {
    Alert.alert("Modal has been closed.");
  };

  // Helper function to generate calendar dates
  const generateCalendar = (date) => {
    const start = startOfWeek(startOfMonth(date));
    const end = endOfWeek(endOfMonth(date));
    return eachDayOfInterval({ start, end });
  };

  const dates = generateCalendar(currentDate);

  // Handlers for month navigation
  const handlePrevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <MaterialIcons
              style={styles.navButton}
              name="arrow-back-ios"
              size={20}
              color="blue"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {format(currentDate, "MMMM yyyy")}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <MaterialIcons
              style={styles.navButton}
              name="arrow-forward-ios"
              size={24}
              color="blue"
            />
          </TouchableOpacity>
        </View>

        {/* Weekdays */}
        <View style={styles.weekdays}>
          {weeks.map((day, index) => (
            <Text
              key={day}
              style={[
                styles.weekdayText,
                index === 0 && styles.sundayText, // Sunday: Red
                index === 6 && styles.saturdayText, // Saturday: Blue
              ]}
            >
              {day}
            </Text>
          ))}
        </View>

        {/* Dates */}
        <FlatList
          data={dates}
          numColumns={7}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => {
            const isSelected =
              selectedDate &&
              format(selectedDate, "yyyy-MM-dd") === format(item, "yyyy-MM-dd");
            const isCurrentMonth =
              format(item, "MM") === format(currentDate, "MM");
            const isTodayDate = isToday(item);

            return (
              <TouchableOpacity
                style={[
                  styles.dateContainer,
                  isSelected && styles.selectedDate,
                  isTodayDate && styles.todayDate,
                  !isCurrentMonth && styles.outsideDate,
                ]}
                onPress={() => setSelectedDate(item)}
              >
                <Text style={styles.dateText}>{format(item, "d")}</Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                activeTab === tab.id && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.title} {tab.count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{tabs[activeTab].content}</Text>
        </View>
      </View>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleAddButtonPress}
      >
        <MaterialIcons name="add" size={30} color={COLORS.WHITE}/>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  navButton: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekdays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    width: 40,
  },
  sundayText: {
    color: COLORS.RED, // Sunday: Red
  },
  saturdayText: {
    color: COLORS.BLUE, // Saturday: Blue
  },
  dateContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 48,
    margin: 2,
    borderRadius: 24,
  },
  dateText: {
    fontSize: 14,
    textAlign: "center",
  },
  selectedDate: {
    borderColor: COLORS.BLUE_SKY,
    borderWidth: 3,
  },
  todayDate: {
    borderColor: COLORS.BLUE_SKY,
    borderWidth: 3,
  },
  outsideDate: {
    opacity: 0.4,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderBottomColor: COLORS.WHITE,
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 7,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  activeTabText: {
    color: "#1E88E5",
    fontWeight: "bold",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: 260,
    backgroundColor: "#F5F5F5",
  },
  contentText: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    color: "#c8c8c8",
    lineHeight: 24,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default CalendarScreen;
