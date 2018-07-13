import { createAction } from 'redux-actions';
import { mapValues, mapKeys, camelCase } from 'lodash';

export default actionTypes => mapValues(
  mapKeys(actionTypes, (_, key) => camelCase(key)),
  value => createAction(value)
);
