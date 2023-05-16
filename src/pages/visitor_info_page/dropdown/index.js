import React, { Component } from 'react'
import { TouchableOpacity, View, LayoutAnimation, UIManager, Dimensions, Text } from 'react-native'
import DropdownButton from './dropdown_button'
import { keyMirror } from '../../../utils'
import { connect } from 'react-redux'
import { styles } from './style'
import { dispatchIndex } from '../../../actions'


UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const AnimationTypeEnum = {
    spring: true,
}
const AnimationType = keyMirror(AnimationTypeEnum)
const animationConfigs = new Map([
    [AnimationType.linear, {
        duration: 175,
        update: {
            type: LayoutAnimation.Types.linear
        }
    }]
]);

class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            check: false,
            indexSelected: null,
            selectedText: this.props.value !== "" ? this.props.value : ""
        }
    }


    componentWillReceiveProps(props) {

        if (props.selectedInfo === this.props.index)
            this.setState({ check: true })
        else
            this.setState({ check: false })
    }

    _onPress = () => {
        LayoutAnimation.configureNext(animationConfigs.get(AnimationType.linear))
        this.props.dispatchIndex(this.props.index)
        this.props.onPressDropdown()
    }

    optionSelected = (id, name) => {
     
        this.setState({ selectedText: name })
        this.props.getDropDownValue(id, name)
    }

    renderSelected() {
        if (this.state.selectedText !== "") {
            return (
                <Text style={styles.resultStyle}>{this.state.selectedText !== "" ? this.state.selectedText : null}</Text>
            )
        }
    }

    render() {
        const deviceWidth = Dimensions.get('window').width
        const deviceHeight = Dimensions.get('window').height

        // console.log(this.props.inputName, this.props.selectedInput)
        return (

            <TouchableOpacity
                onPress={() => { this._onPress(); this.props.falseEmailStatus }}
                activeOpacity={0.9}
                style={{ minHeight: 1, justifyContent: 'center', alignItems: "center", marginTop: deviceHeight * 0.01 }}>

                <View style={

                    this.props.inputName !== this.props.selectedInput
                        ?
                        {
                            borderColor: 'gray', borderRadius: 5,
                            backgroundColor: 'rgb(241, 242, 243)', width: deviceWidth * 0.5,
                            height: deviceHeight * 0.1, alignItems: "flex-start", textAlign:
                                'center', marginVertical: deviceHeight * 0.01
                        }
                        :
                        {

                            elevation: 5, borderColor: 'gray', borderRadius: 5,
                            backgroundColor: 'rgb(255, 255, 255)', width: deviceWidth * 0.65,
                            textAlign:
                                'center', margin: 10, shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.36,
                            shadowRadius: 6.68,

                            elevation: 1,
                        }
                }>
                    <View>
                        <View style={[{ flex: 1, flexDirection: 'row', alignItems: 'center' }, this.props.inputName === this.props.selectedInput ? { marginTop: deviceHeight * 0.02 } : null]}>
                            <Text style={styles.pointStyle}>{this.props.requiredFields ? "•" : null}</Text>
                            <Text style={styles.textStyle}>{this.props.title}</Text>
                        </View>

                        <View>
                            {this.renderSelected()}
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: deviceWidth * 0.04, paddingVertical: deviceWidth * 0.02 }}>
                        {
                            this.props.inputName === this.props.selectedInput
                                ?
                                this.props.customList.map((value, index) => {
                                    return (
                                        <DropdownButton
                                            id={value.Id}
                                            name={value.Name}
                                            onPress={() => this.optionSelected(value.Id, value.Name)}
                                        />
                                    )
                                })
                                : null
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    const { selectedInfo } = state.selected_index
    return {
        selectedInfo
    }
};

function bindAction(dispatch) {
    return {
        dispatchIndex: (index) => dispatch(dispatchIndex(index))
    };
}

export default connect(mapStateToProps, bindAction)(Dropdown)


