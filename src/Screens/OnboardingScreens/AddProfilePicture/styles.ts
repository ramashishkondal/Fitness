import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.GREY,
    alignItems: "center",
    paddingTop: 24,
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold1,
    textAlign: "center",
    // ...SPACING.mt5,
    ...SPACING.mh2,
  },
  titleDescriptionText: {
    fontSize: SIZES.font12,
    fontWeight: SIZES.fontBold2,
    color: "#AFB1C7",
    textAlign: "center",
    ...SPACING.mt1,
    paddingHorizontal: 25,
    ...SPACING.mh2,
  },
  addPhotoText: {
    color: COLORS.PRIMARY.PURPLE,
    fontSize: SIZES.fontH7,
    fontWeight: SIZES.fontBold0,
    ...SPACING.mt2,
    ...SPACING.mh2,
  },
});
