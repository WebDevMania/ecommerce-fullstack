const { AiOutlineStar, AiFillStar } = require("react-icons/ai");

const numToStars = (value) => {
    if (Number(value) === 0) {
      return (
        <>
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </>
      );
    } else if (Number(value) === 1) {
      return (
        <>
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </>
      );
    } else if (Number(value) === 2) {
      return (
        <>
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </>
      );
    } else if (Number(value) === 3) {
      return (
        <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </>
      );
    } else if (Number(value) === 4) {
      return (
        <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </>
      );
    } else if (Number(value) === 5) {
      return (
        <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </>
      );
    }
};

export default numToStars