/* eslint-disable @typescript-eslint/no-empty-function */
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import React, { useEffect } from "react";
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
import HourMinutesFormater from "../utils/dateformatting";
import { LocationInfo, Todo, TodoFormValues } from "../utils/types";

interface Props {
  onSubmit: (values: TodoFormValues) => void;
  todo?: Todo;
  location?: LocationInfo;
  picture?: string;
  returnPath: string;
}

function TodoForm({ onSubmit, todo, location, picture, returnPath }: Props) {
  const navigate =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const initialValues: TodoFormValues = todo
    ? {
        ...todo,
        dueDate: new Date(todo.dueDate),
        alertTime: todo.alertTime ? new Date(todo.alertTime) : undefined,
      }
    : {
        title: "",
        description: "",
        coordinates: undefined,
        location: undefined,
        dueDate: new Date(),
        alertTime: undefined,
        alertOnLocation: false,
        imageUri: undefined,
        status: "Pending",
        priority: "Medium",
      };

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    coordinates: Yup.object().shape({
      lat: Yup.number(),
      lng: Yup.number(),
    }),
    location: Yup.string(),
    dueDate: Yup.date().required("Due date is required"),
    alertTime: Yup.date(),
    alertOnLocation: Yup.boolean(),
    imageUri: Yup.string(),
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
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      formik.setFieldValue("imageUri", result.uri);
    }
  };

  useEffect(() => {
    if (location) {
      if (formik.values.coordinates !== location.coordinates) {
        formik.setFieldValue("coordinates", location.coordinates);
      }

      if (formik.values.location !== location.location) {
        formik.setFieldValue("location", location.location);
      }
    }
  }, [location, formik]);

  useEffect(() => {
    if (picture) {
      if (formik.values.imageUri !== picture) {
        formik.setFieldValue("imageUri", picture);
      }
    }
  }, [picture, formik]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            {formik.values.title ? formik.values.title : "New Todo"}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Priority: </Text>
            <Button
              mode="contained"
              onPress={() => {
                // eslint-disable-next-line no-unused-expressions
                formik.values.priority === "Low"
                  ? formik.handleChange("priority")("Medium")
                  : formik.values.priority === "Medium"
                  ? formik.handleChange("priority")("High")
                  : formik.handleChange("priority")("Low");
              }}
              buttonColor={
                formik.values.priority === "Low"
                  ? "green"
                  : formik.values.priority === "Medium"
                  ? "orange"
                  : "red"
              }
            >
              {formik.values.priority}
            </Button>
          </View>
        </View>
        <TextInput
          label="Title"
          onChangeText={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          value={formik.values.title}
          error={Boolean(formik.touched.title && formik.errors.title)}
          mode="outlined"
        />
        {formik.touched.title && formik.errors.title && (
          <HelperText type="error">{formik.errors.title}</HelperText>
        )}

        <TextInput
          label="Description"
          onChangeText={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
          value={formik.values.description}
          error={Boolean(
            formik.touched.description && formik.errors.description
          )}
          multiline
          mode="outlined"
          style={styles.input}
        />
        {formik.touched.description && formik.errors.description && (
          <HelperText type="error">{formik.errors.description}</HelperText>
        )}

        <View style={styles.section}>
          <Text style={styles.title}>Date</Text>
          <View style={styles.horizontal}>
            <View>
              <Text style={styles.text}>Due date:</Text>
              <Text style={styles.smallText}>
                {new Date(formik.values.dueDate).toDateString()}
              </Text>
              <Text style={styles.smallText}>
                {HourMinutesFormater(formik.values.dueDate)}
              </Text>
            </View>
            <Button
              mode="contained"
              onPress={() => {
                dateTimePicker(formik.values.dueDate, "date", (event, date) => {
                  if (event.type === "set") {
                    formik.setFieldValue("dueDate", date);

                    if (date) {
                      dateTimePicker(new Date(date), "time", (e, time) => {
                        if (e.type === "set") {
                          formik.setFieldValue("dueDate", time);
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
                {formik.values.alertTime ? (
                  <>
                    <Text style={styles.smallText}>
                      {formik.values.alertTime
                        ? formik.values.alertTime.toDateString()
                        : "None"}
                    </Text>
                    <Text style={styles.smallText}>
                      {HourMinutesFormater(formik.values.alertTime)}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.smallText}>No Alert</Text>
                )}
              </View>
              {formik.values.alertTime && (
                <IconButton
                  icon="close"
                  size={20}
                  style={{
                    alignSelf: "flex-end",
                    marginBottom: 12,
                  }}
                  onPress={() => {
                    formik.setFieldValue("alertTime", undefined);
                  }}
                />
              )}
            </View>
            <Button
              mode="contained"
              onPress={() => {
                dateTimePicker(formik.values.dueDate, "date", (event, date) => {
                  if (event.type === "set") {
                    formik.setFieldValue("alertTime", date);

                    if (date) {
                      dateTimePicker(new Date(date), "time", (e, time) => {
                        if (e.type === "set") {
                          formik.setFieldValue("alertTime", time);
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
            <Text style={{ ...styles.text, flex: 1 }}>
              {formik.values.location ? formik.values.location : "No location"}
            </Text>

            <Button
              mode="contained"
              onPress={() => {
                navigate.navigate("Map", { returnPath });
              }}
              style={{ marginLeft: "auto" }}
            >
              Set Location
            </Button>
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.text}>Alert on location: </Text>
            <Switch
              value={formik.values.alertOnLocation}
              onValueChange={(e) => {
                formik.setFieldValue("alertOnLocation", e);
              }}
              disabled={!formik.values.coordinates}
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
              source={
                formik.values.imageUri
                  ? {
                      uri: formik.values.imageUri,
                    }
                  : require("../assets/placeholder.png")
              }
              style={{ width: 200, height: 200 }}
            />
            <View style={{ justifyContent: "space-around" }}>
              <Button
                mode="contained"
                onPress={pickImage}
                style={{ marginBottom: 10 }}
              >
                Select Image
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  navigate.navigate("Camera", { returnPath });
                }}
              >
                Take Picture
              </Button>
            </View>
          </View>
        </View>

        <Button
          onPress={formik.handleSubmit}
          mode="contained"
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Submit
        </Button>
      </View>
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
    flex: 1,
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
