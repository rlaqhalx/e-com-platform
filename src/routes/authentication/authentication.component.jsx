import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { AuthenticationContainer } from './authentication.styles';

const Authentication = (props) => {

  const{setUserName} = props;

  return (
    <AuthenticationContainer>
      <SignInForm setUserName={setUserName}/>
      <SignUpForm />
    </AuthenticationContainer>
  );
};
export default Authentication; 
