import React from 'react';
import PropTypes from 'prop-types';
import classes from './picture.module.scss';
import logoImage from '../../img/logo.png';

export default function Picture({ className, src, alt }) {
  return (
    <div className={`${classes.picture} ${className}`}>
      <img className={classes['picture-img']} src={src} alt={alt} />
    </div>
  );
}

Picture.defaultProps = {
  className: '',
  src: logoImage,
  alt: '',
};

Picture.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};
