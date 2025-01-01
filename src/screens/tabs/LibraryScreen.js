import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text, TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { width } = Dimensions.get('window');

export default function LibraryScreen() {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  const [activeTab, setActiveTab] = useState(0); // 현재 활성화된 탭

  const tabs = [
    { id: 0, title: '식단', count: 0, content: '추가 버튼을 눌러\n식단을 기록해주세요' },
    { id: 1, title: '운동', count: 0, content: '추가 버튼을 눌러\n운동을 기록해주세요' },
    { id: 2, title: '신체', count: 0, content: '추가 버튼을 눌러\n신체를 기록해주세요' },
  ];

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            {/*<Text style={styles.title}>Your Schedule</Text>*/}
            <Text style={styles.title}>{moment(value).format('YYYY년 M월')}</Text>
          </View>

          <View style={styles.picker}>
            <Swiper
                index={1}
                ref={swiper}
                loop={false}
                showsPagination={false}
                onIndexChanged={ind => {
                  if (ind === 1) {
                    return;
                  }
                  setTimeout(() => {
                    const newIndex = ind - 1;
                    const newWeek = week + newIndex;
                    setWeek(newWeek);
                    setValue(moment(value).add(newIndex, 'week').toDate());
                    swiper.current.scrollTo(1, false);
                  }, 100);
                }}>
              {weeks.map((dates, index) => (
                  <View style={styles.itemRow} key={index}>
                    {dates.map((item, dateIndex) => {
                      const isActive =
                          value.toDateString() === item.date.toDateString();
                      return (
                          <TouchableWithoutFeedback
                              key={dateIndex}
                              onPress={() => setValue(item.date)}>
                            <View
                                style={[
                                  styles.item,
                                  isActive && {
                                    backgroundColor: '#111',
                                    borderColor: '#111',
                                  },
                                ]}>
                              <Text
                                  style={[
                                    styles.itemWeekday,
                                    isActive && { color: '#fff' },
                                  ]}>
                                {item.weekday}
                              </Text>
                              <Text
                                  style={[
                                    styles.itemDate,
                                    isActive && { color: '#fff' },
                                  ]}>
                                {item.date.getDate()}
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                      );
                    })}
                  </View>
              ))}
            </Swiper>

          </View>
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
            <Text style={styles.contentText}>
              {tabs[activeTab].content}
            </Text>
          </View>
          {/* Floating Button */}
          <TouchableOpacity style={styles.floatingButton}>
            <MaterialIcons name="add" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  btContainer: {
    flex: 1,
    paddicngVertical: 24,

    backgroundColor: "red"
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ececec',
    // borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginHorizontal: 25,
    marginVertical: 15,
    padding: 7
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#1E88E5',
    fontWeight: 'bold',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 460,
    backgroundColor: '#F5F5F5',
  },
  contentText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    color: '#c8c8c8',
    lineHeight: 24,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
});