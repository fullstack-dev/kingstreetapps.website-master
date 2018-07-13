import createBemClass from 'react-bem-builder';

export const cssTransitionClasses = (className) => {
  const cn = createBemClass(className);
  const modified = (modifier) => cn(String(), [modifier]);
  return {
    appear: modified('appear'),
    appearActive: modified('active-appear'),
    enter: modified('enter'),
    enterActive: modified('active-enter'),
    enterDone: modified('done-enter'),
    exit: modified('exit'),
    exitActive: modified('active-exit'),
    exitDone: modified('done-exit'),
  };
};
