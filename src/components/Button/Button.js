import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export default Button = ({text, theme = 'primary', size, onPress, style = {} }) => {
    const getPadding = (size) => {
        if(size == 'small')
            return 7;

        if(size == 'large')
            return 20;

        return 15;
    }

    const getBackgroundColor = (theme) => {
        if(theme.includes('outline'))
            return 'transparent';

        switch(theme){
            case 'primary':
                return '#010656'
            case 'secondary':
                return '#00935c';
            case 'success':
                return '#7fc03a';
            case 'warning':
                return '#f29e2e';
            case 'danger':
                return '#e31e23';
            default:
                return '#ffffff';
        }
    }

    const getShadow = (theme) => {
        if(theme.includes('outline'))
            return 'transparent';

        switch(theme){
            case 'primary':
                return 'rgba(2, 11, 84, 0.2)';
            case 'secondary':
                return 'rgba(0, 147, 92, 0.2)';
            case 'success':
                return 'rgba(227, 30, 35, 0.2)';
            case 'warning':
                return 'rgba(227, 30, 35, 0.2)';
            case 'danger':
                return 'rgba(227, 30, 35, 0.2)';
            default:
                return 'rgba(227, 30, 35, 0.2)';
        }
    }

    const getColor = (theme) => {
        if(!theme.includes('outline'))
            return '#ffffff';

        switch(theme){
            case 'primary-outline':
                return '#e31e23';
            case 'secondary-outline':
                return '#00935c';
            case 'success-outline':
                return '#7fc03a';
            case 'warning-outline':
                return '#f29e2e';
            case 'danger-outline':
                return '#e31e23';
            default:
                return '#000000';
        }
    }

    const getFontSize = (size) => {
        if(size == 'small')
            return 14;

        if(size == 'large')
            return 18;

        return 16;
    }

    const getFontWeight = (theme) => {
        if(theme.includes('outline'))
            return '400';

        return '600';
    }

    const styles = StyleSheet.create({
        body: {
            paddingTop: getPadding(size),
            paddingBottom: getPadding(size),
            paddingRight: 20,
            paddingLeft: 20,
            backgroundColor: getBackgroundColor(theme),
            borderRadius: 6,
            marginBottom: 20,
            shadowOpacity: 1,
            shadowRadius: 11,
            shadowColor: getShadow(theme),
            shadowOffset: { height: 8, width: 0 },
            width: '100%',
            ...style,
        },
        text: {
            color: getColor(theme),
            fontSize: getFontSize(size),
            textAlign: 'center',
            fontWeight: getFontWeight(theme),
            width: '100%',
        }
    });

    return (
        <TouchableOpacity style={styles.body} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    theme: PropTypes.string,
    size: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.object
};