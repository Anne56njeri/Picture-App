import React from 'react';
import {
  Content, Container, Text, Header, Left, Icon, Body, Title, View, Toast,
} from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/common/buttons/Button';
import SignUpForm from '../../components/Auth/SignUpForm';
import validate from '../../components/lib/functions/auth/validate';
import { signUp } from '../../redux/signup/action';
import Loader from '../../components/general/Loader';
import { signInWithGoogle } from '../../components/lib/functions/auth/googleSignIn';
import { signInWithFacebook } from '../../components/lib/functions/auth/facebook';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,

  },
  formContainer: {
    paddingRight: 30,
    paddingLeft: 30,
    padding: 15,

  },


});

// eslint-disable-next-line react/prefer-stateless-function
class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  back=() => {
    this.props.navigation.navigate('Welcome');
  };

  logIn=() => {
    this.props.navigation.navigate('Login');
  };

  signUp=(email, password) => {
    const { error } = this.props;
    const user1 = {
      email,
      password,
    };
    /* we import the validate function to check
    *  whether email and password are empty
    * */
    const { errors, isValid } = validate(user1);
    if (!isValid) {
      this.setState({ errors });
    } else if (isValid) {
      const { dispatch } = this.props;
      this.setState({ errors: {} });
      dispatch(signUp(email, password)).then((body) => {
        if (error == null) {
          Toast.show({
            text: ' Successfully Sign up',
            type: 'success',
            position: 'top',
            duration: 3000,
          });

          this.props.navigation.navigate('App');
        } else if (error !== null) {
          Toast.show({
            text: 'an error occurred',
            type: 'danger',
            position: 'top',
            duration: 3000,

          });

          this.props.navigation.navigate('Auth');
        }
      });
    }
  };

  facebookSignIn=() => {
    signInWithFacebook();
  };

  googleSignIn=() => {
    signInWithGoogle();
  };

  render() {
    const { errors } = this.state;
    const { loading } = this.props;
    if (loading) {
      return (
        <Loader />
      );
    }
    return (
      <Container>
        <Header transparent>
          <Left>
            <Icon type="Feather" name="arrow-left" onPress={this.back} style={{ color: '#008ae6' }} />
          </Left>
        </Header>
        <Content>
          <Body style={{ marginTop: 50 }}>
            <Title style={{ color: '#404040', fontSize: 30 }}>Sign Up</Title>
            <Text>{' '}</Text>
            <Text
              note
              style={{ fontSize: 14 }}
            >
              {' '}
            Please sign up to enter in app
            </Text>
            <Text>{' '}</Text>
            <Text>{' '}</Text>

            <Text
              note
              style={{ fontSize: 12 }}
            >
              {' '}
              Enter via social networks
            </Text>
            <View style={styles.buttonContainer}>
              <Button googleButton icon="google-plus" iconColor="white" size={40} onPress={this.googleSignIn} />

              <Text>{' '}</Text>
              <Text>{' '}</Text>
              <Button facebook icon="facebook-square" iconColor="white" size={40} onPress={this.facebookSignIn} />
            </View>
            <Text>{' '}</Text>
            <Text>{' '}</Text>
            <Text
              note
              style={{ fontSize: 12 }}
            >
              {' '}
              or sign up with email
            </Text>
          </Body>
          <View style={styles.formContainer}>
            <SignUpForm errors={errors} signUp={this.signUp} />
            <Text>{' '}</Text>

          </View>
          <View style={{ alignItems: 'center' }}>

            <Text
              note
              style={{ fontSize: 12 }}
            >
              Already have an account ?
            </Text>
            <TouchableOpacity onPress={this.logIn}><Text style={{ color: '#008ae6', fontSize: 12 }} note>Login</Text></TouchableOpacity>

          </View>

        </Content>
      </Container>
    );
  }
}

SignUpScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.details.loading,
  error: state.details.error,
});

export default connect(mapStateToProps)(SignUpScreen);
