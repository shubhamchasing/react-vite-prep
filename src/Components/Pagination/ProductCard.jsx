const ProductCard = ({id, image, title }) => {
  return (
    <div className="card">
        <p>{id}</p>
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
};
export default ProductCard;
