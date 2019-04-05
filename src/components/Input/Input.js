import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, StyleSheet} from 'react-native';

export default Input = (props) => {
    const styles = StyleSheet.create({
        input: {
            paddingTop: 12,
            paddingBottom: 12,
            paddingRight: 20,
            paddingLeft: 20,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#c3c3c3',
            backgroundColor: '#fff',
            marginBottom: 12,
            width: '100%',
            ...props.style
        }
    });

    return (
        <TextInput
            {...props}
            style={styles.input}
            onChangeText={value => props.onChangeText(value)}
        />
    );
}

Input.propTypes = {
    onChangeText: PropTypes.func.isRequired,
};
