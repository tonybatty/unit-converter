import React from "react"
import { StyleSheet, View, Text, TouchableHighlight } from "react-native"
import convert from "convert-units"
import { titleCase } from "../Helpers.js"
import { FontAwesome5 } from '@expo/vector-icons'

export default function PickerItem({
  value,
  handleChange,
  setModalVisible,
  unitPicker,
  titleBarPicker,
  selectedValue
}) {
  return (
    <TouchableHighlight
      activeOpacity={0.85}
      underlayColor="#DDDDDD"
      style={[
        styles.container,
        { backgroundColor: (unitPicker && (convert().describe(value).singular === selectedValue)) || selectedValue === value ? '#d6e7fb' : 'transparent' },
        {}
      ]}
      onPress={() => {
        handleChange(value), setModalVisible(false)
      }}>

      <View style={styles.textWrapper}>
        <Text style={[styles.text, { color: (unitPicker && (convert().describe(value).singular === selectedValue)) || selectedValue === value ? '#2973f4' : 'black' }]}>{unitPicker ? convert().describe(value).singular : titleCase(value)}</Text>
        <FontAwesome5 color={(unitPicker && (convert().describe(value).singular === selectedValue)) || selectedValue === value ? '#2973f4' : 'transparent'} size={20} name={'check'} style={styles.icon} />
      </View>

    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 16,
    display: "flex",
    justifyContent: "center",

  },
  text: {
    fontSize: 16,
    paddingLeft: 8,
    flex: 1
  },
  textWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
})
