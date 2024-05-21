import { View, Dimensions, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import EdvnzTheme from "@mono-repo/provider";
import DateBlock from "./DateBlock";

const DatePicker = ({
  value,
  onChange = (date: any) => {},
  height = null,
  width = null,
  fontSize = "",
  startYear = 0,
  endYear = 0,
  markHeight = null,
  format = "",
}) => {
  const [days, setDays] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const { theme } = useContext(EdvnzTheme);
  useEffect(() => {
    const end = endYear || new Date().getFullYear();
    const start = !startYear || startYear > end ? end - 100 : startYear;

    const _days = [...Array(31)].map((_, index) => index + 1);
    const _months = [...Array(12)].map((_, index) => index + 1);
    const _years = [...Array(end - start + 1)].map((_, index) => start + index);
    setDays(_days);
    setMonths(_months);
    setYears(_years);
  }, []);
  const pickerHeight = Math.round(
    height || Dimensions.get("window").height / 3.5
  );
  const pickerWidth = width || "100%";

  const unexpectedDate = new Date(years[88], 0, 1);
  let date = new Date(unexpectedDate);
  if (value) {
    date = new Date(value);
  }

  const changeHandle = (type, digit) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case "day":
        date.setDate(digit);
        break;
      case "month":
        date.setMonth(digit - 1);
        break;
      case "year":
        date.setFullYear(digit);
        break;
    }
    onChange(date);
    const date2 = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    if (type !== "day") {
      // eslint-disable-next-line no-underscore-dangle
      const _days = [...Array(date2)].map((_, index) => index + 1);

      setDays(_days);
    }
  };

  const getOrder = () => {
    return (format || "dd-mm-yyyy").split("-").map((type, index) => {
      switch (type) {
        case "dd":
          return { name: "day", digits: days, value: date.getDate() };
        case "mm":
          return { name: "month", digits: months, value: date.getMonth() + 1 };
        case "yyyy":
          return { name: "year", digits: years, value: date.getFullYear() };
        default:
          console.warn(
            `Invalid date picker format prop: found "${type}" in ${format}. Please read documentation!`
          );
          return {
            name: ["day", "month", "year"][index],
            digits: [days, months, years][index],
            value: [date.getDate(), date.getMonth() + 1, date.getFullYear()][
              index
            ],
          };
      }
    });
  };

  const dHeight = Math.round(pickerHeight / 4);
  const mHeight = markHeight || Math.min(dHeight, 65);

  return (
    <View style={[styles.picker, { height: pickerHeight, width: pickerWidth }]}>
      <View
        style={[
          styles.mark,
          {
            top: (pickerHeight - mHeight) / 2,
            backgroundColor: theme.colors.textPrimary,
            height: mHeight,
            width: "100%",
          },
        ]}
      />
      {getOrder()?.map((el, index) => {
        return (
          <DateBlock
            key={index.toString()}
            digits={el.digits}
            value={el.value}
            onChange={changeHandle}
            height={pickerHeight}
            fontSize={fontSize}
            type={el.name}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mark: {
    position: "absolute",
    borderRadius: 10,
  },
  picker: {
    flexDirection: "row",
    width: "100%",
  },
});

export default DatePicker;
