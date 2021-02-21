import React, { Component, useEffect } from "react"
import { StyleSheet, Platform, SafeAreaView, View, Text } from "react-native"
import { StatusBar } from 'expo-status-bar'
import convert from "convert-units"
import { LinearGradient } from 'expo-linear-gradient'
import Converter from "./components/Converter"
import Inputs from "./components/Inputs"
import Header from "./components/Header"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isReady: false,
      unitCategoryArr: this.getUnitCategories(),
      fromUnitsArr: convert()
        .list("length")
        .map((unit) => unit.abbr),
      toUnitsArr: convert()
        .list("length")
        .map((unit) => unit.abbr),
      unitCategory: "length",
      fromUnit: "mm",
      fromUnitValue: "",
      toUnit: "cm",
      toUnitValue: "",
      inputFromSelected: true,
    }

    this.pressInput = this.pressInput.bind(this)
    this.longPressInput = this.longPressInput.bind(this)
    this.changeUnitCategory = this.changeUnitCategory.bind(this)
    this.changeFromUnit = this.changeFromUnit.bind(this)
    this.changeToUnit = this.changeToUnit.bind(this)
    this.onPressInput = this.onPressInput.bind(this)
  }

  componentDidMount() {

  }

  pressInput(input) {
    let newState = { ...this.state }

    if (newState.inputFromSelected) {
      if (input === "DEL") {
        newState.fromUnitValue = newState.fromUnitValue.slice(0, -1)
      } else if (!(input === "." && newState.fromUnitValue.includes(".")) && newState.fromUnitValue.length < 9) {
        newState.fromUnitValue += input
      }

      if (newState.fromUnitValue.length === 0) {
        newState.toUnitValue = ""
      } else {
        if (newState.fromUnit === newState.toUnit) {
          newState.toUnitValue = newState.fromUnitValue
        } else {
          newState.toUnitValue = this.convertUnits(
            newState.fromUnitValue,
            newState.fromUnit,
            newState.toUnit,
          )
        }

      }
    } else {
      if (input === "DEL") {
        newState.toUnitValue = newState.toUnitValue.slice(0, -1)
      } else if (!(input === "." && newState.fromUnitValue.includes(".")) && newState.toUnitValue.length < 9) {
        newState.toUnitValue += input
      }

      if (newState.toUnitValue.length === 0) {
        newState.fromUnitValue = ""
      } else {
        if (newState.toUnit === newState.fromUnit) {
          newState.fromUnitValue = newState.toUnitValue
        } else {
          newState.fromUnitValue = this.convertUnits(
            newState.toUnitValue,
            newState.toUnit,
            newState.fromUnit,
          )
        }
      }
    }

    this.setState(newState)
  }

  getUnitCategories() {
    const units = ['area', 'digital', 'energy', 'frequency', 'length', 'mass', 'angle', 'pressure', 'speed', 'temperature', 'time', 'volume']
    const filteredUnits = convert().measures().filter(unit => units.includes(unit))
    const sortedUnits = filteredUnits.sort()
    return sortedUnits
  }

  longPressInput(input) {
    if (input === "DEL") {
      this.setState({
        fromUnitValue: "",
        toUnitValue: "",
      })
    } else {
      this.pressInput(input)
    }
  }

  changeUnitCategory(unitCategory) {
    this.setState({
      fromUnitsArr: convert()
        .list(unitCategory)
        .map((unit) => unit.abbr),
      toUnitsArr: convert()
        .list(unitCategory)
        .map((unit) => unit.abbr),
      unitCategory: unitCategory,
      fromUnitValue: "",
      fromUnit: convert().list(unitCategory)[0].abbr,
      toUnitValue: "",
      toUnit: convert().list(unitCategory)[1].abbr,
      inputFromSelected: true,
    })
  }

  changeFromUnit(unit) {
    let newState = { ...this.state }
    newState.fromUnit = unit

    if (newState.fromUnitValue === "") {
      newState.toUnitValue = ""
    } else {
      if (newState.fromUnit === newState.toUnit) {
        newState.toUnitValue = newState.fromUnitValue
      } else {
        newState.toUnitValue = this.convertUnits(
          newState.fromUnitValue,
          newState.fromUnit,
          newState.toUnit,
        )
      }
    }

    this.setState(newState)
  }

  changeToUnit(unit) {
    let newState = { ...this.state }
    newState.toUnit = unit

    if (newState.fromUnitValue === "") {
      newState.toUnitValue = ""
    } else {
      if (newState.toUnit === newState.fromUnit) {
        newState.fromUnitValue = newState.toUnitValue
      } else {
        newState.toUnitValue = this.convertUnits(
          newState.fromUnitValue,
          newState.fromUnit,
          newState.toUnit,
        )
      }
    }
    this.setState(newState)
  }

  onPressInput(fromInput) {
    this.setState({ inputFromSelected: fromInput })
  }

  convertUnits(unitFromValue, fromUnit, toUnit) {
    return parseFloat(
      convert(unitFromValue).from(fromUnit).to(toUnit).toFixed(6),
    ).toString()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style={Platform.OS === 'ios' ? "dark" : "light"} translucent={false} />
        <LinearGradient
          colors={['#CED9E3', 'white']}
          style={styles.linearGradient}
        >
          <SafeAreaView style={[styles.container]}>
            <Header
              unitCategoryArr={this.state.unitCategoryArr}
              unitCategory={this.state.unitCategory}
              changeUnitCategory={this.changeUnitCategory}
            />
            <View style={{ flex: 1 }}>
              <Converter
                unitCategoryArr={this.state.unitCategoryArr}
                fromUnitsArr={this.state.fromUnitsArr}
                toUnitsArr={this.state.toUnitsArr}
                unitCategory={this.state.unitCategory}
                fromUnitValue={this.state.fromUnitValue}
                fromUnit={this.state.fromUnit}
                toUnitValue={this.state.toUnitValue}
                toUnit={this.state.toUnit}
                changeUnitCategory={this.changeUnitCategory}
                changeFromUnit={this.changeFromUnit}
                changeToUnit={this.changeToUnit}
                onPressInput={this.onPressInput}
                inputFromSelected={this.state.inputFromSelected}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Inputs
                pressInput={this.pressInput}
                longPressInput={this.longPressInput}
              />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red'
    // backgroundColor: "#DCE0E2",
  },
  linearGradient: {
    flex: 1
  }
})