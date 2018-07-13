import {
  mapKeys,
  mapValues,
  kebabCase,
  pickBy,
  assignIn
} from 'lodash';

export const getModifiersWithNonBoolValue = (properties) => {
  const kebabCasedProperties = mapKeys(pickBy(properties), (value, key) => kebabCase(key) + '-' + value);
  return mapValues(kebabCasedProperties, (key) => true);
};

export const getModifiersWithBoolValue = (properties) => {
  return mapKeys(properties, (_, key) => kebabCase(key));
};

export const getModifiers = (nonBoolProperties, boolProperties) => {
  return assignIn({}, getModifiersWithNonBoolValue(nonBoolProperties), getModifiersWithBoolValue(boolProperties));
};
