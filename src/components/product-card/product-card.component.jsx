import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const {addItemToCart} = useContext(CartContext);

  // if we were directly using addItemTocart
  // onClick = {() => addItemToCart(product)} 
  // BUT for optimazation, create the below function 

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name> {name} </Name>
        <Price className="price"> {price} </Price>
      </Footer>
      <Button buttonType="inverted" onClick = {addProductToCart}> Add to Cart </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
