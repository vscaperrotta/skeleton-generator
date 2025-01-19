import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { doExample } from '@store/actions/home';
import { nullSafe } from '@utils/globalMethods';
import './Home.scss';

const Home = (props) => {
  const dispatch = useDispatch();
  const example = useSelector(state => nullSafe(() => state.home.example, null));

  function handleClick() {
    // Code here..
    const randomNumber = Math.floor(Math.random() * 100);
    dispatch(doExample(randomNumber));
  }

  useEffect(() => {
    // Code here..
    console.log('home slector', example)
  }, [example]);

  return (
    <div className="container">
      <header>
        <h3>Frontend Ark Scaffolding</h3>
      </header>
      <br />
      <main>
        <h5>
          {example}
        </h5>
        <br />
        <button onClick={() => handleClick()}>CLICK</button>
      </main>
    </div>
  );
}

Home.propTypes = {
  // Add here some propTypes
  actions: PropTypes.objectOf(PropTypes.func),
  data: PropTypes.object,
};

Home.defaultProps = {
  // Add here some default propTypes values
  data: {},
};

export default Home;
