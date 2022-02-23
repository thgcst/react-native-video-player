import React from 'react';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import TextInput from '~/components/TextInput';
import { PrimaryButton, SecondaryButton } from '~/components/Button';
import DismissKeyboard from '~/components/DismissKeyboard';
import Images from '~/assets/images';
import Routes from '~/navigation/routes';
import validationSchema from './validationSchema';

import {
  Container,
  WrapperTop,
  Logo,
  WrapperMiddle,
  WrapperInput,
  WrapperForgotPassword,
  ForgotPasswordText,
  WrapperButtons,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const { values, handleChange, errors, touched, handleSubmit } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: () => {
      navigation.navigate(Routes.LOGGED);
    },
    validationSchema,
  });

  return (
    <DismissKeyboard>
      <Container>
        <WrapperTop>
          <Logo source={Images.Logo} />
        </WrapperTop>
        <WrapperMiddle>
          <WrapperInput>
            <TextInput
              placeholder="Digite seu e-mail"
              onChangeText={handleChange('email')}
              value={values.email}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              touched={touched.email}
              error={errors.email}
              returnKeyType="next"
            />
          </WrapperInput>
          <WrapperInput>
            <TextInput
              placeholder="Digite sua senha"
              onChangeText={handleChange('password')}
              value={values.password}
              autoCapitalize="none"
              autoCorrect={false}
              touched={touched.password}
              error={errors.password}
              onSubmitEditing={handleSubmit}
              returnKeyType="go"
              secureTextEntry
            />
          </WrapperInput>
          <WrapperForgotPassword>
            <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
          </WrapperForgotPassword>
          <WrapperButtons>
            <PrimaryButton onPress={handleSubmit}>Continuar</PrimaryButton>
            <SecondaryButton>Criar conta</SecondaryButton>
          </WrapperButtons>
        </WrapperMiddle>
      </Container>
    </DismissKeyboard>
  );
};

export default SignIn;
