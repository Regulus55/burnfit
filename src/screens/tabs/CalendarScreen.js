import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null); // 공백 추가
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    return daysArray.map((day, index) => {
      const isToday =
        day &&
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;
      const isSelected =
        selectedDate &&
        selectedDate.year === year &&
        selectedDate.month === month &&
        selectedDate.day === day;
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.dayContainer,
            isToday && styles.today, // 오늘 날짜 스타일
            isSelected && styles.selectedDay, // 선택된 날짜 스타일
          ]}
          onPress={() => day && setSelectedDate({ year, month, day })}
        >
          <Text
            style={[
              styles.dayText,
              isToday && styles.todayText, // 오늘 날짜 텍스트 색상
              isSelected && styles.selectedDayText, // 선택된 날짜 텍스트 색상
            ]}
          >
            {day || ""}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(prevMonth);
  };
  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(nextMonth);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#85c2cc" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {currentDate.toLocaleString("en-US", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <MaterialIcons name="arrow-forward-ios" size={24} color="#85c2cc" />
        </TouchableOpacity>
      </View>
      {/* 요일 */}
      <View style={styles.daysOfWeek}>
        {weeks.map((day, index) => (
          <Text
            key={index}
            style={[
              styles.dayOfWeek,
              day === "Sun" && styles.sunday, // 일요일 스타일
              day === "Sat" && styles.saturday, // 토요일 스타일
            ]}
          >
            {day}
          </Text>
        ))}
      </View>
      {/* 날짜 */}
      <View style={styles.daysGrid}>{renderDays()}</View>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: 'center',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
    width: "100%",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  dayOfWeek: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#b0b0b0",
    width: "14.28%",
  },
  sunday: {
    color: "red",
  },
  saturday: {
    color: "blue",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayContainer: {
    width: "14.28%", // 7일의 비율로 설정
    aspectRatio: 1, // 정사각형 비율 유지
    justifyContent: "center",
    alignItems: "center",
  },
  today: {
    borderColor: "#007AFF",
    borderWidth: 2,
    borderRadius: 50, // 정사각형의 반으로 설정
  },
  todayText: {
    color: "black",
  },
  selectedDay: {
    backgroundColor: "#007AFF",
    borderRadius: 50, // 정사각형의 반으로 설정
  },
  selectedDayText: {
    color: "white",
    fontWeight: "bold",
  },
  dayText: {
    fontSize: 16,
    color: "black",
  },
});
