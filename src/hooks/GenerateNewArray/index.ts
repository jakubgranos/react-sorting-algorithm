type GenerateNewArrayProps = {
  range: number;
  max: number;
};

/**
 * Hook generates a new array of numbers in the range and return array  of numbers
 * @range - number of elements in the array
 * @max - maximum value of the element in the array
 */
const generateNewArray = ({ range, max }: GenerateNewArrayProps) => {
  /**
   * If the range is not provided, return an empty array
   */
  if (!range) {
    return [];
  }

  return Array.from({ length: range }, () => Math.floor(Math.random() * max));
};

export default generateNewArray;
