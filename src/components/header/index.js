import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { styles } from "./style"

class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Image style={styles.imageStyle} source={require("../../assets/noqNoqLogo.png")} />
                </View>

                <View style={styles.textContainer}>

                    {this.props.logo ?
                        <Image style={styles.logoStyle} source={{uri:this.props.img}}/>
                        :
                        <Text style={styles.textStyle}>{this.props.text}</Text>
                    }

                </View>

                <View style={styles.emptyContainer}>

                </View>
            </View>
        )
    }
}
export default Header;