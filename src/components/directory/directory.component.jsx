import DirectoryItem from '../directory-item/directory-item.component';

import { DirectoryContainer } from './directory.styles';

import raincoatsImg from '../../assets/preview-image/output-onlinejpgtools.jpg'
import sweaterImg from '../../assets/preview-image/sweaterImg.jpg'
import bandanaImg from '../../assets/preview-image/bandana.webp'
import foodImg from '../../assets/preview-image/food.webp'
import toyImg from '../../assets/preview-image/toy.jpg'



const categories = [
  {
    id: 1, 
    title: 'Sweater',
    imageUrl: sweaterImg,
    route: 'shop/sweaters'
  },
  {
    id: 2,
    title: 'Raincoats',
    imageUrl: raincoatsImg,
    route: 'shop/raincoats'

  },
  {
    id: 3,
    title: 'Accessories',
    imageUrl: bandanaImg,
    route: 'shop/accessories'
  },
  {
    id: 4,
    title: 'Foods',
    imageUrl: foodImg,
    route: 'shop/foods'
  },
  {
    id: 5,
    title: 'Toys',
    imageUrl: toyImg,
    route: 'shop/toys'
  },
];

const Directory = () => {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;