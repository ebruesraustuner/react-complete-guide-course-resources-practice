import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Dummy_Products = [
  {
    id: 'p1',
    price: 8,
    title :'My First Book',
    description: 'The first book i ever wrote'
  },
  {
    id: 'p2',
    price: 8,
    title :'My Second Book',
    description: 'The secondt book i ever wrote'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {Dummy_Products.map((product) => (
          <ProductItem key={product.id}
                      title={product.title}
                      price={product.price}
                      id={product.id}
                      description={product.description}
        />
        ))}
        
      </ul>
    </section>
  );
};

export default Products;
