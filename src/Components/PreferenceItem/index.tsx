// libs
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";

// custom
import { COLORS, ANIMATIONS } from "../../Constants";
import { styles } from "./styles";

type PreferenceItemProps = {
  title?: string;
};
const PreferenceItem = ({ title }: PreferenceItemProps) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toogleIsChecked = () => {
    setIsChecked(!isChecked);
  };
  const handleOnPress = () => {
    scale.value = withSequence(
      withSpring(ANIMATIONS.sizeIncrease1),
      withSpring(ANIMATIONS.sizeNormal)
    );
    setIsChecked(!isChecked);
  };
  return (
    <Animated.View style={[styles.parent, animatedStyle]}>
      <Pressable onPress={handleOnPress}>
        <View style={styles.childCtr}>
          <View style={styles.textCtr}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <BouncyCheckbox
            size={28}
            fillColor={COLORS.PRIMARY.PURPLE}
            unFillColor={COLORS.PRIMARY.GREY}
            innerIconStyle={{ borderColor: COLORS.PRIMARY.GREY }}
            onPress={toogleIsChecked}
            isChecked={isChecked}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default PreferenceItem;
