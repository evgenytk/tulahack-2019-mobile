import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import * as AuthActions from './../../redux-modules/auth/actions';
import AuthService from './../../service/AuthService';

export class Auth extends Component {
    constructor(props) {
        super(props);
        this._bootstrap();
    }

    componentDidUpdate() {
        if(this.props.user)
            return this.props.navigation.navigate('App');
        
        if(this.props.error)
            return this.props.navigation.navigate('Auth');
    }

    _bootstrap() {
        const auth = new AuthService();
        auth.getToken()
            .then(token => {
                if(token != 'none')
                    return this.props.getProfile();

                return this.props.navigation.navigate('Auth');
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.body}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const { error, user } = state.auth;
    return { error, user };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(AuthActions.fetchProfileBegin())
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Auth);

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 45
    }
});
