import React from "react";
import { DatePickerInput } from "react-native-paper-dates";

export default function ReadMeExampleDatePickerInput() {
  const [inputDate, setInputDate] = React.useState<Date | undefined>(undefined);

  return (
    <DatePickerInput
      locale="en"
      label="Birthdate"
      value={inputDate}
      onChange={(d) => setInputDate(d)}
      inputMode="start"
      // mode="outlined" (see react-native-paper docs)
      // calendarIcon="calendar" // optional, default is "calendar"
      // other react native TextInput props
    />
  );
}
