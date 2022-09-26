import { Formik } from "formik";
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
import { DatePickerInput } from "react-native-paper-dates";
import * as Yup from "yup";
import { Todo, TodoFormValues } from "../utils/types";

interface Props {
  onSubmit: (values: TodoFormValues) => void;
  todo?: Todo;
}

function TodoForm({ onSubmit, todo }: Props) {
  const initialValues: TodoFormValues = todo || {
    title: "",
    description: "",
    coordinates: undefined,
    dueDate: new Date(),
    alertTime: undefined,
    alertOnLocation: false,
    picture: require("../assets/placeholder.png"),
    status: "pending",
    priority: "medium",
  };

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    coordinates: Yup.object().shape({
      lat: Yup.number().required("Latitude is required"),
      lng: Yup.number().required("Longitude is required"),
    }),
    dueDate: Yup.date().required("Due date is required"),
    alertTime: Yup.date().required("Alert time is required"),
    alertOnLocation: Yup.boolean().required("Alert on location is required"),
    picture: Yup.string().required("Picture is required"),
    status: Yup.string().required("Status is required"),
    priority: Yup.string().required("Priority is required"),
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
                    {values.dueDate.toDateString()}
                  </Text>
                  <Text style={styles.smallText}>
                    {values.dueDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
                <Button
                  mode="contained"
                  onPress={() => {
                    setFieldValue("dueDate", new Date());
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
                    <Text style={styles.smallText}>
                      {values.alertTime
                        ? values.alertTime.toDateString()
                        : "None"}
                    </Text>
                    <Text style={styles.smallText}>
                      {values.alertTime?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
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
                    // eslint-disable-next-line no-unused-expressions
                    setFieldValue("alertTime", new Date());
                  }}
                >
                  Set Time
                </Button>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.header}>Location</Text>
              <View style={styles.horizontal}>
                <Text style={styles.text}>
                  {values.location ? values.location : "No location"}
                </Text>
                <DatePickerInput
                  label="Due date"
                  value={values.dueDate}
                  onChange={(date) => setFieldValue("dueDate", date)}
                  locale="en-GB"
                  inputMode="start"
                />
                <Button
                  mode="contained"
                  onPress={() => {}}
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

            <Button onPress={() => handleSubmit}>Submit</Button>
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
