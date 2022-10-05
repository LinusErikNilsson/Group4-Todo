import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Camera">;

export default function CameraScreen({ navigation, route }: Props) {
  const [type, setType] = useState(CameraType.back);
  const [cameraPermission, setCameraPermission] = useState<boolean>();
  const [photo, setPhoto] = useState<CameraCapturedPicture>();
  const [mediaLibraryPermission, setMediaLibraryPermission] =
    useState<boolean>();
  const cameraRef = useRef<Camera>(null);

  const toggleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermissions =
        await MediaLibrary.requestPermissionsAsync();
      setCameraPermission(cameraPermissions.status === "granted");
      setMediaLibraryPermission(mediaLibraryPermissions.status === "granted");
    })();
  }, []);

  if (cameraPermission === undefined || mediaLibraryPermission === undefined) {
    return <Text>Requesting Permissions</Text>;
  }

  if (!cameraPermission || !mediaLibraryPermission) {
    return (
      <Text>
        No access to camera or media library, please change in settings.
      </Text>
    );
  }

  const takePicture = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false,
      skipProcessing: false,
    };

    if (cameraRef.current) {
      const takenPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takenPhoto);
    }
  };

  if (photo) {
    const savePhoto = async () => {
      const uri = await MediaLibrary.createAssetAsync(photo.uri);

      setPhoto(undefined);

      navigation.navigate(
        route.params.returnPath === "Edit" ? "Edit" : "Create",
        {
          location: undefined,
          picture: uri.uri,
        }
      );
    };

    const newPhoto = () => {
      setPhoto(undefined);
    };

    return (
      <View style={styles.container}>
        <Image style={styles.camera} source={{ uri: photo.uri }} />
        <View style={styles.camera}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={newPhoto} style={styles.button}>
              <Text style={styles.previewText}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePhoto} style={styles.button}>
              <Text style={styles.previewText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef} autoFocus>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  button: {
    // alignItems: "center",
    alignSelf: "flex-end",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  previewText: {
    fontSize: 14,
    color: "black",
  },
});
