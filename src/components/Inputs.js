import React from "react"
import PropTypes from "prop-types"
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from "react-native"
import { FontAwesome5 } from '@expo/vector-icons'

export default function Inputs({ pressInput, longPressInput }) {
  const buttons = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "0",
    `DEL`,
  ]

  return (
    <View style={styles.buttonWrapper}>
      {buttons.map((button, index) => (
        <View style={styles.buttonContainer} key={button}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              pressInput(button)
            }}
            onLongPress={() => {
              longPressInput(button)
            }}>
            {(
              button !== "DEL" ?
                <Text style={styles.buttonText}>{button}</Text>
                : <View style={styles.buttonIcon}><FontAwesome5 size={24} name={'backspace'} /></View>
            )}
          </TouchableHighlight>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 60,
    height: "100%",
    paddingLeft: 32,
    paddingRight: 32
  },
  buttonContainer: {
    width: "33.33%",
    height: "25%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
  },
  buttonIcon: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 2
  }
})
