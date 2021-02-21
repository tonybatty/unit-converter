import React, { Component, useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ShadowPropTypesIOS,
  SafeAreaView,
  ScrollView,
  Platform
} from "react-native"
import PickerItem from "./PickerItem"
import { titleCase } from "../Helpers.js"
import Modal from "./Modal.js"

export default function Picker({
  pickerItems,
  selectedValue,
  changeUnitCategory,
  handleChange,
  unitPicker,
  unitValue,
  color,
  titleBarPicker,
  backgroundColor,
  highlightColor
}) {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.wrapper} >
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
        }}>
        <View style={styles.centeredView}>
          <SafeAreaView style={[styles.modalContainer, Platform.OS !== 'web' ? styles.modalContainerMobile : null]}>
            <ScrollView style={styles.modalView}>
              <View>
                {pickerItems.map((unit, index) => (
                  <View key={unit} style={index !== 0 ? styles.pickerItemBorder : null}>
                    <PickerItem
                      value={unit}
                      handleChange={handleChange}
                      setModalVisible={setModalVisible}
                      unitPicker={unitPicker}
                      titleBarPicker={titleBarPicker}
                      selectedValue={selectedValue}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
            <TouchableHighlight
              style={styles.button}
              activeOpacity={0.85}
              underlayColor="#DDDDDD"
              onPress={() => {
                setModalVisible(!modalVisible)
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
          </SafeAreaView>
        </View>
      </Modal>
      {
        titleBarPicker ?
          <TouchableOpacity
            style={styles.picker}
            onPress={() => {
              setModalVisible(!modalVisible)
            }}>
            <Text style={[styles.titleBarText, { color: "#000000" }]}>{titleCase(selectedValue)}</Text>
          </TouchableOpacity>
          :
          <TouchableHighlight
            activeOpacity={unitPicker ? 1 : 1}
            underlayColor={unitPicker ? highlightColor : null}
            style={[styles.picker, { backgroundColor: backgroundColor, elevation: 2 }]}
            onPress={() => {
              setModalVisible(!modalVisible)
            }}>
            <>
              <Text style={[styles.unitType, { color: color }]}>{selectedValue}</Text>
              <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.unitValue, { color: color }]}>{
                Number(unitValue).toLocaleString()}</Text>
            </>
          </TouchableHighlight>
      }

    </View >
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: "100%"
  },
  modalContainer: {
    width: "90%",
    maxWidth: 500,
    maxHeight: "100%",
    justifyContent: "center",
  },
  modalContainerMobile: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalView: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
  },
  picker: {
    height: "100%",
    justifyContent: "center",
    padding: 0,
    borderRadius: 20,
  },
  unitType: {
    fontSize: 20,
    fontWeight: "500",
    position: "absolute",
    top: 16,
    left: 16,
  },
  unitValue: {
    textAlign: "right",
    fontSize: 55,
    paddingRight: 16,
    paddingLeft: 16,
  },
  titleBarText: {
    color: "#ffffff",
    textAlign: "left",
    fontSize: 34,
    lineHeight: 34,
    height: 34,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "white",
    paddingTop: 15,
    paddingRight: 32,
    paddingBottom: 15,
    paddingLeft: 32,
    borderRadius: 16,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 30
  },
})
