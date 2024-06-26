// libs
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

// custom
import { ICONS, SIZES } from "../../Constants";
import { styles } from "./styles";

export type SelectCustomPhotoProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setPhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const iconSize = 60;

const SelectCustomPhoto = ({
  modalVisible,
  setModalVisible,
  setPhoto,
}: SelectCustomPhotoProps) => {
  useEffect(() => {
    if (modalVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [modalVisible]);

  const options: CameraOptions = {
    mediaType: "photo",
  };
  const openCamera = async () => {
    try {
      const result: ImagePickerResponse = await launchCamera(options);
      if (result.assets !== undefined) {
        setPhoto(result?.assets[0]?.uri);
      }
    } catch (e) {
      console.log("error uploading photo from camera - ", e);
    }
  };
  const openGallery = async () => {
    try {
      const result: ImagePickerResponse = await launchImageLibrary(options);
      if (result.assets !== undefined) {
        setPhoto(result?.assets[0]?.uri);
      }
      setModalVisible(false);
    } catch (e) {
      console.log("error uploading photo from library - ", e);
    }
  };

  // bottom sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("sheet changes", index);
  }, []);
  const onDismiss = () => {
    setModalVisible(false);
  };
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onDismiss={onDismiss}
        backgroundStyle={{
          borderRadius: SIZES.rounding3,
        }}
      >
        <BottomSheetView style={styles.modalCtr}>
          <View style={styles.iconsCtr}>
            <TouchableOpacity style={styles.icons} onPress={openCamera}>
              {ICONS.Camera({ width: iconSize, height: iconSize })}
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons} onPress={openGallery}>
              {ICONS.Gallery({ width: iconSize, height: iconSize })}
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default SelectCustomPhoto;
