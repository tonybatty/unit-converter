import React from "react"
import {
  StyleSheet,
  Text,
  View,
} from "react-native"
import Picker from "./Picker"
import PickerItem from "./PickerItem"
import convert from "convert-units"

export default function Converter({
  unitCategoryArr,
  fromUnitsArr,
  toUnitsArr,
  unitCategory,
  fromUnitValue,
  fromUnit,
  toUnitValue,
  toUnit,
  changeUnitCategory,
  changeFromUnit,
  changeToUnit,
  onPressInput,
  inputFromSelected,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <View style={styles.inputFromWrapper}>
          <Picker
            selectedValue={convert().describe(fromUnit).singular}
            pickerItems={fromUnitsArr}
            handleChange={changeFromUnit}
            unitPicker={true}
            unitValue={fromUnitValue}
            color="#003f88"
            backgroundColor="#FFFFFF"
            highlightColor="#F2F2F2"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.inputToWrapper}>
          <Picker
            selectedValue={convert().describe(toUnit).singular}
            pickerItems={toUnitsArr}
            handleChange={changeToUnit}
            unitPicker={true}
            unitValue={toUnitValue}
            color="#FFFFFF"
            backgroundColor="#003f88"
            highlightColor="#002D76"
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
  },
  pickerWrapper: {
    marginBottom: 12,
    marginTop: 120,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    height: 50,
    display: "flex",
    justifyContent: "center",

  },
  inputGroup: {
    flexDirection: "column",
    height: 100,
    flex: 1,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,

  },
  inputFromWrapper: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
  },
  inputToWrapper: {
    flex: 1,
    backgroundColor: "#003f88",
    color: "white",
    borderRadius: 20,
  },
  picker: {
    height: "100%",
    width: "100%",
  },
  text: {
    textAlign: "right",
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 16,
  },
  textDefault: {
    borderWidth: 1,
    borderColor: "#c4c4c4",
  }
})
