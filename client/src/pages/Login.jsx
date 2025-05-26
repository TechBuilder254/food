import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const primaryColor = '#64b5f6';

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #f7f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  display: flex;
`;

const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 4px;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid ${primaryColor};
  background-color: ${primaryColor};
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  ${props => props.rightPanelActive && `transform: translateX(-100%);`}
`;

const Overlay = styled.div`
  background: ${primaryColor};
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${props => props.rightPanelActive && `transform: translateX(50%);`}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${props => props.left && `transform: translateX(-20%);`}
  ${props => props.right && `right: 0; transform: translateX(0);`}
  ${props => props.rightPanelActive && props.left && `transform: translateX(0);`}
  ${props => props.rightPanelActive && props.right && `transform: translateX(20%);`}
`;

const Title = styled.h2`
  font-weight: bold;
  margin: 0;
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const PanelContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  width: 50%;

  ${props => props.login && `left: 0; z-index: 2;`}
  ${props => props.register && `left: 0; opacity: 0; z-index: 1;`}
  ${props => props.forgot && `left: 0; z-index: 3; display: ${props.isForgotPasswordActive ? 'block' : 'none'};`}

  ${props => props.rightPanelActive && props.login && `transform: translateX(100%);`}
  ${props => props.rightPanelActive && props.register && `transform: translateX(100%); opacity: 1; z-index: 5; animation: show 0.6s;`}

  @keyframes show {
    0%, 49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%, 100% {
      opacity: 1;
      z-index: 5;
    }
  }
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 12px;
`;

const RememberMeInput = styled.input`
  margin-right: 5px;
`;

const Message = styled.p`
  font-size: 14px;
  color: red;
  margin-top: 10px;
`;

const Login = ({ onLogin }) => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isForgotPasswordActive, setIsForgotPasswordActive] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // Toggle login/register
  const togglePanel = () => {
    setIsLoginActive(!isLoginActive);
    setMessage('');
    setIsForgotPasswordActive(false);

    // Clear all form fields when switching
    setLoginUsername('');
    setLoginPassword('');
    setRegisterUsername('');
    setRegisterEmail('');
    setRegisterPassword('');
  };

  // Handle Login - always allow login regardless of credentials
  const handleLogin = (e) => {
    e.preventDefault();
    // Immediately set logged in and redirect to home
    localStorage.setItem('auth', 'true');
    localStorage.setItem('user', JSON.stringify({ username: loginUsername || 'guest' }));
    if (onLogin) onLogin(loginUsername || 'guest');
    navigate('/');
  };

  // Handle Registration (you can keep or remove this if you want)
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('Registration is disabled in this demo.');
  };

  // Handle Forgot Password (optional, just clear form)
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setMessage('Forgot password is disabled in this demo.');
  };

  return (
    <Container>
      <FormContainer>
        <PanelContainer login rightPanelActive={!isLoginActive}>
          <Form onSubmit={handleLogin}>
            <Title>Login</Title>
            <Input
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <RememberMe>
              <RememberMeInput
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </RememberMe>
            <Button type="submit">Login</Button>
            {message && <Message>{message}</Message>}
          </Form>
        </PanelContainer>
        <PanelContainer register rightPanelActive={!isLoginActive}>
          <Form onSubmit={handleRegister}>
            <Title>Register</Title>
            <Input
              type="text"
              placeholder="Username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              disabled
            />
            <Input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              disabled
            />
            <Input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              disabled
            />
            <Button type="submit" disabled>Register</Button>
            {message && <Message>{message}</Message>}
          </Form>
        </PanelContainer>
        <PanelContainer forgot isForgotPasswordActive={isForgotPasswordActive}>
          <Form onSubmit={handleForgotPassword}>
            <Title>Forgot Password</Title>
            <Input
              type="email"
              placeholder="Email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              disabled
            />
            <Input
              type="password"
              placeholder="New Password"
              value={forgotNewPassword}
              onChange={(e) => setForgotNewPassword(e.target.value)}
              disabled
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={forgotConfirmPassword}
              onChange={(e) => setForgotConfirmPassword(e.target.value)}
              disabled
            />
            <Button type="submit" disabled>Save</Button>
            {message && <Message>{message}</Message>}
          </Form>
        </PanelContainer>
        <OverlayContainer rightPanelActive={!isLoginActive}>
          <Overlay rightPanelActive={!isLoginActive}>
            <OverlayPanel left rightPanelActive={!isLoginActive}>
              <Title>Welcome Back!</Title>
              <Paragraph>To keep connected with us please login with your personal info</Paragraph>
              <GhostButton onClick={togglePanel}>Login</GhostButton>
            </OverlayPanel>
            <OverlayPanel right rightPanelActive={!isLoginActive}>
              <Title>Hello, Friend!</Title>
              <Paragraph>Enter your personal details and start your journey with us</Paragraph>
              <GhostButton onClick={togglePanel}>Register</GhostButton>
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </FormContainer>
    </Container>
  );
};

export default Login;
