import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { ReactComponent as CorgiLogo } from '../../assets/corgi_logo.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
  StyledText,
} from './navigation.styles';

const Navigation = (props) => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen)
  const {userName} = props;
  console.log('Current User:', currentUser); // Add this line to display currentUser in the console
  console.log("HI",userName)


  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          {/* <CrwnLogo className='logo' /> */}
          {/* <CorgiLogo className='logo'/> */}
          <CorgiLogo className='logo'/>

        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>

          {currentUser ? (
            <>
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
            <StyledText>
             Hello {userName.split(" ")[0]} {':)'}
            </StyledText>
            </>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;