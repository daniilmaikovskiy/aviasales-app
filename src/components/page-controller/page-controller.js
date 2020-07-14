import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import classes from './page-controller.module.scss';

export default function PageController({ total, onChange, current }) {
  if (total === 0) {
    return null;
  }

  return (
    <Pagination
      size="small"
      pageSize="1"
      total={total}
      showSizeChanger={false}
      onChange={onChange}
      current={current}
      className={classes.pageController}
    />
  );
}

PageController.propTypes = {
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
};
