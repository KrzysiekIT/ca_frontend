const getDeepValue = (sourceObject, fields) => {
  let value = sourceObject;
  const fieldsLength = fields.length;
  let fieldIndex = 0;
  for (fieldIndex; fieldIndex < fieldsLength; fieldIndex++) {
    value = value?.[fields?.[fieldIndex]];
  }
  return value;
};

export {getDeepValue};
