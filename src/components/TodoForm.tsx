/* eslint-disable @typescript-eslint/no-empty-function */
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik, useFormik } from "formik";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  IconButton,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import * as Yup from "yup";
import { RootStackParamList } from "../App";
import { LocationInfo, Todo, TodoFormValues } from "../utils/types";

interface Props {
  onSubmit: (values: TodoFormValues) => void;
  todo?: Todo;
  location?: LocationInfo;
}

function TodoForm({ onSubmit, todo, location }: Props) {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // const getGeoLocation = async (coordinates: LatLng) => {
  //   console.log(coordinates);
  //   const loc = await Location.reverseGeocodeAsync(coordinates, {
  //     useGoogleMaps: true,
  //   });
  //   return loc[0].street;
  // };

  const initialValues: TodoFormValues = todo || {
    title: "",
    description: "",
    coordinates: location?.coordinates,
    location: location?.address,
    dueDate: new Date(),
    alertTime: undefined,
    alertOnLocation: false,
    picture: require("../assets/placeholder.png"),
    status: "pending",
    priority: "medium",
  };

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    coordinates: Yup.object().shape({
      lat: Yup.number(),
      lng: Yup.number(),
    }),
    dueDate: Yup.date().required("Due date is required"),
    alertTime: Yup.date(),
    alertOnLocation: Yup.boolean(),
    picture: Yup.string().required("Picture is required"),
    status: Yup.string().required("Status is required"),
    priority: Yup.string().required("Priority is required"),
  });

  const dateTimePicker = (
    startValue: Date,
    mode: "date" | "time",
    handleChange: (event: DateTimePickerEvent, date?: Date) => void
  ) => {
    DateTimePickerAndroid.open({
      value: startValue,
      mode,
      onChange: handleChange,
    });
  };

  const formik = useFormik<TodoFormValues>({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      onSubmit(values);
      navigate.goBack();
    },
  });

  return (
    <ScrollView>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <Text style={styles.title}>
                {values.title ? values.title : "New Todo"}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>Priority: </Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    // eslint-disable-next-line no-unused-expressions
                    values.priority === "low"
                      ? handleChange("priority")("medium")
                      : values.priority === "medium"
                      ? handleChange("priority")("high")
                      : handleChange("priority")("low");
                  }}
                  buttonColor={
                    values.priority === "low"
                      ? "green"
                      : values.priority === "medium"
                      ? "orange"
                      : "red"
                  }
                >
                  {values.priority}
                </Button>
              </View>
            </View>
            <TextInput
              label="Title"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              error={Boolean(touched.title && errors.title)}
              mode="outlined"
            />
            {touched.title && errors.title && (
              <HelperText type="error">{errors.title}</HelperText>
            )}

            <TextInput
              label="Description"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              error={Boolean(touched.description && errors.description)}
              multiline
              mode="outlined"
              style={styles.input}
            />
            {touched.description && errors.description && (
              <HelperText type="error">{errors.description}</HelperText>
            )}

            <View style={styles.section}>
              <Text style={styles.title}>Date</Text>
              <View style={styles.horizontal}>
                <View>
                  <Text style={styles.text}>Due date:</Text>
                  <Text style={styles.smallText}>
                    {new Date(values.dueDate).toLocaleDateString()}
                  </Text>
                  <Text style={styles.smallText}>
                    {values.dueDate.getHours() +
                      ":" +
                      values.dueDate.getMinutes()}
                  </Text>
                </View>
                <Button
                  mode="contained"
                  onPress={() => {
                    dateTimePicker(values.dueDate, "date", (event, date) => {
                      if (event.type === "set") {
                        setFieldValue("dueDate", date);

                        if (date) {
                          dateTimePicker(new Date(date), "time", (e, time) => {
                            if (e.type === "set") {
                              setFieldValue("dueDate", time);
                            }
                          });
                        }
                      }
                    });
                  }}
                  style={{ alignSelf: "flex-end" }}
                >
                  Set Date
                </Button>
              </View>
              <View style={{ ...styles.horizontal, marginTop: 20 }}>
                <View
                  style={{
                    ...styles.horizontal,
                    width: "70%",
                    justifyContent: "flex-start",
                  }}
                >
                  <View>
                    <Text style={styles.text}>Alert time</Text>
                    {values.alertTime ? (
                      <>
                        <Text style={styles.smallText}>
                          {values.alertTime
                            ? values.alertTime.toDateString()
                            : "None"}
                        </Text>
                        <Text style={styles.smallText}>
                          {values.alertTime.getHours() +
                            ":" +
                            values.alertTime.getMinutes()}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.smallText}>No Alert</Text>
                    )}
                  </View>
                  {values.alertTime && (
                    <IconButton
                      icon="close"
                      size={20}
                      style={{
                        alignSelf: "flex-end",
                        marginBottom: 12,
                      }}
                      onPress={() => {
                        setFieldValue("alertTime", undefined);
                      }}
                    />
                  )}
                </View>
                <Button
                  mode="contained"
                  onPress={() => {
                    dateTimePicker(values.dueDate, "date", (event, date) => {
                      if (event.type === "set") {
                        setFieldValue("alertTime", date);

                        if (date) {
                          dateTimePicker(new Date(date), "time", (e, time) => {
                            if (e.type === "set") {
                              setFieldValue("alertTime", time);
                            }
                          });
                        }
                      }
                    });
                  }}
                  style={{ alignSelf: "flex-end" }}
                >
                  Set Alert
                </Button>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>Location</Text>
              <View style={styles.horizontal}>
                <Text style={styles.text}>
                  {values.location ? values.location : "No location"}
                </Text>

                <Button
                  mode="contained"
                  onPress={() => {
                    navigate.navigate("Map");
                  }}
                  style={{ marginLeft: "auto" }}
                >
                  Set Location
                </Button>
              </View>
              <View style={styles.horizontal}>
                <Text style={styles.text}>Alert on location: </Text>
                <Switch
                  value={values.alertOnLocation}
                  onValueChange={(e) => setFieldValue("alertOnLocation", e)}
                  disabled={!values.coordinates}
                />
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text style={styles.header}>Image</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Image
                  source={values.picture}
                  style={{ width: 200, height: 200 }}
                />
                <View style={{ justifyContent: "space-around" }}>
                  <Button
                    mode="contained"
                    onPress={() => {}}
                    style={{ marginBottom: 10 }}
                  >
                    Select Image
                  </Button>
                  <Button mode="contained" onPress={() => {}}>
                    Take Picture
                  </Button>
                </View>
              </View>
            </View>

            <Button onPress={handleSubmit}>Submit</Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  section: {
    marginTop: 20,
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 20,
    margin: 10,
    marginBottom: 0,
  },
  smallText: {
    fontSize: 15,
    marginLeft: 10,
    color: "grey",
  },
});
