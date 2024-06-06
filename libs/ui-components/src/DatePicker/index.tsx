import React from 'react';
import {DatePickerAndroid} from 'react-native';



const {action, year, month, day} = await DatePickerAndroid.open(
  {
    // Use `new Date()` for current date.
    // May 25 2020. Month 0 is January.
    date: new Date(2020, 4, 25),
  },
);
if (action !== DatePickerAndroid.dismissedAction) {
  // Selected year, month (0-11), day
}
}