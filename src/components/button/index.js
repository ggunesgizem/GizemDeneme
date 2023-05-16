import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={styles.button}
            >
            <Text style={styles.text} text={this.props.text}/>
            </TouchableOpacity>
        );
    }
}


export default Button;
