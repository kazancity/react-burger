import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  carbohydrates: PropTypes.number.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fat: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  id: PropTypes.string,
});
