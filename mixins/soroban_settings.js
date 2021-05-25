const lesson_options = {
  1: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 1,
    maxDigits: 1,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  2: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 1,
    maxDigits: 1,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  3: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 1,
    maxDigits: 1,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  4: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  5: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  6: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 1,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  7: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 1,
    maxDigits: 1,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  8: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 3,
    maxDigits: 3,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  9: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 3,
    maxDigits: 3,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  10: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 1,
    maxDigits: 3,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  11: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 1,
    maxDigits: 3,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  12: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 1,
    maxDigits: 3,
    smallNumber: 1,
    bigNumber: 1,
    isRequired: 0
  },
  13: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 1,
    maxDigits: 1,
    smallNumber: 3,
    bigNumber: 1,
    isRequired: 1
  },
  14: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 1,
    maxDigits: 1,
    smallNumber: 5,
    bigNumber: 1,
    isRequired: 1
  },
  15: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 1,
    maxDigits: 2,
    smallNumber: 7,
    bigNumber: 1,
    isRequired: 1
  },
  16: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 1,
    maxDigits: 1,
    smallNumber: 9,
    bigNumber: 1,
    isRequired: 1
  },
  17: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 1,
    maxDigits: 1,
    smallNumber: 17,
    bigNumber: 1,
    isRequired: 1
  },
  18: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 1,
    maxDigits: 2,
    smallNumber: 25,
    bigNumber: 1,
    isRequired: 1
  },
  19: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 1,
    maxDigits: 2,
    smallNumber: 31,
    bigNumber: 1,
    isRequired: 0
  },
  20: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 1,
    maxDigits: 2,
    smallNumber: 31,
    bigNumber: 1,
    isRequired: 0
  },
  21: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 2,
    maxDigits: 3,
    smallNumber: 31,
    bigNumber: 1,
    isRequired: 0
  },
  22: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 2,
    maxDigits: 3,
    smallNumber: 31,
    bigNumber: 1,
    isRequired: 0
  },
  23: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 3,
    isRequired: 1
  },
  24: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 5,
    isRequired: 1
  },
  25: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 9,
    isRequired: 1
  },
  26: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 15,
    isRequired: 1
  },
  27: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 17,
    isRequired: 1
  },
  28: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 33,
    isRequired: 1
  },
  29: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 65,
    isRequired: 1
  },
  30: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 113,
    isRequired: 1
  },
  31: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 129,
    isRequired: 1
  },
  32: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 257,
    isRequired: 1
  },
  33: {
    minSamples: 4,
    maxSamples: 6,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 513,
    isRequired: 1
  },
  34: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 977,
    isRequired: 1
  },
  35: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 1023,
    isRequired: 1
  },
  36: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 1023,
    isRequired: 1
  },
  37: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 1023,
    isRequired: 0
  },
  38: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 1,
    bigNumber: 1023,
    isRequired: 0
  },
  39: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 3,
    maxDigits: 3,
    smallNumber: 1,
    bigNumber: 1023,
    isRequired: 0
  },
  40: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 3,
    maxDigits: 3,
    smallNumber: 1,
    bigNumber: 1023,
    isRequired: 0
  },
  41: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 31,
    bigNumber: 1023,
    isRequired: 1
  },
  42: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 2,
    maxDigits: 2,
    smallNumber: 31,
    bigNumber: 1023,
    isRequired: 1
  },
  43: {
    minSamples: 5,
    maxSamples: 8,
    minDigits: 3,
    maxDigits: 3,
    smallNumber: 31,
    bigNumber: 1023,
    isRequired: 1
  },
  44: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 3,
    maxDigits: 3,
    smallNumber: 31,
    bigNumber: 1023,
    isRequired: 1
  },
  45: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 1,
    maxDigits: 3,
    smallNumber: 31,
    bigNumber: 1023,
    isRequired: 0
  },
  46: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 1,
    maxDigits: 3,
    smallNumber: 31,
    bigNumber: 1023,
    isRequired: 0
  },
  47: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 1,
    maxDigits: 3,
    smallNumber: 31,
    bigNumber: 1023,
    isRequired: 0
  },
  48: {
    minSamples: 6,
    maxSamples: 10,
    minDigits: 1,
    maxDigits: 3,
    smallNumber: 31,
    bigNumber: 1023,
    isRequired: 0
  }
};

export default lesson_options;
