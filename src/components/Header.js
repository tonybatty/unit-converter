import React from "react"
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native"
import Picker from "./Picker"

export default function Header({
  unitCategoryArr,
  unitCategory,
  changeUnitCategory,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        <Picker
          style={styles.picker}
          color={"white"}
          selectedValue={unitCategory}
          pickerItems={unitCategoryArr}
          handleChange={changeUnitCategory}
          titleBarPicker={true} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  pickerWrapper: {
    marginBottom: 12,
    marginTop: 12,
    height: 50,
    display: "flex",
    justifyContent: "flex-start",
  }
})
