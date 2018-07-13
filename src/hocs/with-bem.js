import React from 'react';
import bemClassnames from 'react-bem-builder';

export default ( defaultBlock ) => WrappedComponent => ({ block, modifier = "", ...rest }) => {
  const cn = bemClassnames(block || defaultBlock, modifier.split(" "));
  return <WrappedComponent {...rest} cn={cn} />;
};
