const pwr = (a, b) => {
  if (b <= 0) return 1;
  return a * pwr(a, b - 1);
};

const pocz = (a, num) => {
  return Math.floor(a / pwr(10, num));
};

const kon = (a, num) => {
  return a % pwr(10, num);
};

const dajbit = (n, bit) => {
  if (bit <= 0) return n % 2;
  return dajbit(Math.floor(n / 2), bit - 1);
};

const cDCP = (n, d, mus) => {
  if (n < 5 && d > 5 && d < 5 + n)
    return dajbit(mus.duzy, d) && dajbit(mus.maly, 10 - d);
  if (d > n - 4 && d < 5) return dajbit(mus.maly, d);
  if (d > n) return dajbit(mus.duzy, d);
  return 0;
};

const cDC = (n, d, mus) => {
  if (d.zwrot == 1) return cDCP(n, d.wartosc, mus);
  return cDCP(n, 9 - d.wartosc, mus);
};

const cD = (n, d, mus) => {
  if (d.wartosc == 0) return 0;
  if (mus.maly == 1 && mus.duzy == 1) return 1;
  const d1 = {
    wartosc: d.wartosc,
    zwrot: d.wartosc > 0 ? 1 : -1
  };
  const d2 = {
    wartosc: d.wartosc,
    zwrot: d.wartosc > 0 ? 1 : -1
  };
  d1.wartosc = Math.floor(d1.wartosc / 10);
  d2.wartosc %= 10;
  return cD(Math.floor(n / 10), d1, mus) || cDC(n % 10, d2, mus);
};

const iPMCP = (n, d) => {
  let ile = n > 4 ? 2 * (n - 4) : n + 1;
  if (n > 4) {
    for (let i = n - 4; i < 5; i++) {
      ile += dajbit(d.maly, i);
    }
  }
  return ile - 1;
};

const iPMDCP = (n, d) => {
  let ile = n > 4 ? 2 * (n - 4) : n + 1;
  if (n > 4) {
    for (let i = n - 4; i < 5; i++) {
      ile += dajbit(d.maly, i);
      ile += dajbit(d.duzy, 5 + i);
    }
  } else {
    for (let i = n + 1; i < 10; i++) {
      if (i > 5 && i < n + 6) {
        ile += dajbit(d.maly, 10 - i) && dajbit(d.duzy, i);
      } else ile += dajbit(d.duzy, i);
    }
  }

  return ile;
};
const iPMDP = (n, d) => {
  if (d.cyfry > 0) {
    const d1 = JSON.parse(JSON.stringify(d));
    const d2 = JSON.parse(JSON.stringify(d));
    d1.cyfry = 1;
    d2.cyfry = d.cyfry - 1;
    return iPMDCP(pocz(n, d2.cyfry), d1) * iPMDP(kon(n, d2.cyfry), d2);
  }
  return 1;
};
const iPP = (n, d) => {
  if (d.cyfry > 0) {
    const d1 = JSON.parse(JSON.stringify(d));
    const d2 = JSON.parse(JSON.stringify(d));
    d1.cyfry = 1;
    d2.cyfry = d.cyfry - 1;
    return (
      iPMCP(pocz(n, d2.cyfry), d1) * iPMDP(kon(n, d2.cyfry), d2) +
      iPP(kon(n, d2.cyfry), d2)
    );
  }
  return 1;
};

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const rPMCP = (n, d) => {
  if (iPMCP(n, d) == 0) {
    console.log("Losowanie z 0!");
    return;
  }
  let r = randomInteger(0, iPMCP(n, d) - 1);
  if (n > 4) {
    for (let i = n - 4; i < 5; i++) {
      if (r >= i && !dajbit(d.maly, i)) {
        r++;
      }
    }
  }
  return r;
};
//dla cyfry n
const rPMDCP = (n, d) => {
  let r = randomInteger(0, iPMDCP(n, d) - 1);
  if (n > 4) {
    for (let i = n - 4; i < 5; i++) {
      if (r >= i && !dajbit(d.maly, i)) {
        r++;
      }
    }
    for (let i = n + 1; i < 10; i++) {
      if (r >= i && !dajbit(d.duzy, i)) {
        r++;
      }
    }
  } else {
    for (let i = n + 1; i < 10; i++) {
      if (i > 5 && i < n + 6) {
        if (r >= i && !(dajbit(d.duzy, i) && dajbit(d.maly, 10 - i))) {
          r++;
        }
      } else if (r >= i && !dajbit(d.duzy, i)) {
        r++;
      }
    }
  }
  return r;
};
const rPMDP = (n, d) => {
  if (d.cyfry > 0) {
    const d1 = JSON.parse(JSON.stringify(d));
    const d2 = JSON.parse(JSON.stringify(d));
    d1.cyfry = 1;
    d2.cyfry = d.cyfry - 1;
    d1.cyfry = 1;
    d2.cyfry = d.cyfry - 1;
    return (
      rPMDCP(pocz(n, d2.cyfry), d1) * pwr(10, d2.cyfry) +
      rPMDP(kon(n, d2.cyfry), d2)
    );
  }
  return 0;
};
const rPP = (n, d) => {
  if (d.cyfry > 0) {
    let r = randomInteger(0, iPP(n, d) - 1);
    const d1 = JSON.parse(JSON.stringify(d));
    const d2 = JSON.parse(JSON.stringify(d));
    d1.cyfry = 1;
    d2.cyfry = d.cyfry - 1;
    if (r < iPP(kon(n, d2.cyfry), d2)) {
      return pocz(n, d2.cyfry) * pwr(10, d2.cyfry) + rPP(kon(n, d2.cyfry), d2);
    } else {
      return (
        rPMCP(pocz(n, d2.cyfry), d1) * pwr(10, d2.cyfry) +
        rPMDP(kon(n, d2.cyfry), d2)
      );
    }
  }
  return 0;
};

const iPMCM = (n, d) => {
  let ile = n > 4 ? 10 - n : 10 - 2 * n;
  if (n < 5) {
    for (let i = 5 - n; i < 5; i++) {
      ile += dajbit(d.maly, i);
    }
  }
  return ile - 1;
};

const iPMDCM = (n, d) => {
  let ile = n > 4 ? 10 - n : 10 - 2 * n;
  if (n < 5) {
    for (let i = 5 - n; i < 5; i++) {
      ile += dajbit(d.maly, i);
      ile += dajbit(d.duzy, 5 + i);
    }
  } else {
    for (let i = 10 - n; i < 10; i++) {
      if (i > 5 && i < 15 - n) {
        ile += dajbit(d.maly, 10 - i) && dajbit(d.duzy, i);
      } else ile += dajbit(d.duzy, i);
    }
  }
  return ile;
};

const iPMDM = (n, d) => {
  if (d.cyfry > 0) {
    const d1 = JSON.parse(JSON.stringify(d));
    const d2 = JSON.parse(JSON.stringify(d));
    d1.cyfry = 1;
    d2.cyfry = d.cyfry - 1;
    return iPMDCM(pocz(n, d2.cyfry), d1) * iPMDM(kon(n, d2.cyfry), d2);
  }
  return 1;
};

const iPM = (n, d) => {
  if (d.cyfry > 0) {
    const d1 = JSON.parse(JSON.stringify(d));
    const d2 = JSON.parse(JSON.stringify(d));
    d1.cyfry = 1;
    d2.cyfry = d.cyfry - 1;
    return (
      iPMCM(pocz(n, d2.cyfry), d1) * iPMDM(kon(n, d2.cyfry), d2) +
      iPM(kon(n, d2.cyfry), d2)
    );
  }
  return 1;
};

const rPMCM = (n, d) => {
  if (iPMCM(n, d) == 0) {
    console.log("Losowanie z 0!");
    return;
  }
  let r = randomInteger(0, iPMCM(n, d) - 1);
  if (n < 5) {
    for (let i = 5 - n; i < 5; i++) {
      if (r >= i && !dajbit(d.maly, i)) {
        r++;
      }
    }
  }
  return r;
};

const rPMDCM = (n, d) => {
  let r = randomInteger(0, iPMDCM(n, d) - 1);
  if (n < 5) {
    for (let i = 5 - n; i < 5; i++) {
      if (r >= i && !dajbit(d.maly, i)) {
        r++;
      }
    }
    for (let i = 10 - n; i < 10; i++) {
      if (r >= i && !dajbit(d.duzy, i)) {
        r++;
      }
    }
  } else {
    for (let i = 10 - n; i < 10; i++) {
      if (i > 5 && i < 15 - n) {
        if (r >= i && !(dajbit(d.duzy, i) && dajbit(d.maly, 10 - i))) {
          r++;
        }
      } else if (r >= i && !dajbit(d.duzy, i)) {
        r++;
      }
    }
  }
  return r;
};

const rPMDM = (n, d) => {
  if (d.cyfry > 0) {
    const d1 = JSON.parse(JSON.stringify(d));
    const d2 = JSON.parse(JSON.stringify(d));
    d1.cyfry = 1;
    d2.cyfry = d.cyfry - 1;
    return (
      rPMDCM(pocz(n, d2.cyfry), d1) * pwr(10, d2.cyfry) +
      rPMDM(kon(n, d2.cyfry), d2)
    );
  }
  return 0;
};

const rPM = (n, d) => {
  if (d.cyfry > 0) {
    let r = randomInteger(0, iPM(n, d) - 1);
    const d1 = JSON.parse(JSON.stringify(d));
    const d2 = JSON.parse(JSON.stringify(d));
    d1.cyfry = 1;
    d2.cyfry = d.cyfry - 1;
    if (r < iPM(kon(n, d2.cyfry), d2)) {
      return (
        (9 - pocz(n, d2.cyfry)) * pwr(10, d2.cyfry) + rPM(kon(n, d2.cyfry), d2)
      );
    } else {
      return (
        rPMCM(pocz(n, d2.cyfry), d1) * pwr(10, d2.cyfry) +
        rPMDM(kon(n, d2.cyfry), d2)
      );
    }
  }
  return 0;
};

const rP = (n, d, wyklucz = 0) => {
  let k = {};
  let r = randomInteger(0, iPP(n, d) + iPM(n, d) - 1);
  if (r < iPP(n, d)) {
    k.zwrot = 1;
    k.wartosc = rPP(n, d);
  } else {
    k.zwrot = -1;
    k.wartosc = rPM(n, d);
  }
  if (k.wartosc == 0 || k.wartosc == wyklucz) {
    k = rP(n, d, wyklucz);
  }
  return k;
};

const dajPrzyklad = (d, mus) => {
  let flag = 0;
  let tab = new Array(d.dlugosc).fill({ wartosc: 0, zwrot: 1 });
  while (!flag) {
    let k = { wartosc: 0, zwrot: -1 };
    let n = randomInteger(0, pwr(10, d.cyfry) - 1 - 1) + 1;
    k.wartosc = n;
    for (let i = 1; i < d.dlugosc; i++) {
      k.zwrot *= -1;
      k = rP(n, d, k);

      if (cD(n, k, mus)) flag = 1;
      tab[d.dlugosc - i] = k;
      n += k.zwrot == 1 ? -k.wartosc : k.wartosc;
    }
    if (d.maly * d.duzy == 1) flag = 1;
    tab[0] = { zwrot: 1, wartosc: n };
  }
  // DODANA PĘTLA PRZEZE MNIE
  for (let i = 1; i < tab.length; i++) {
    if (tab[i].wartosc === tab[i - 1].wartosc) {
      const newTab = dajPrzyklad(d, mus);
      return newTab;
    }
  }
  for (let i = 2; i < tab.length; i++) {
    if (tab[i].wartosc === tab[i - 2].wartosc) {
      const newTab = dajPrzyklad(d, mus);
      return newTab;
    }
  }
  for (let i = 3; i < tab.length; i++) {
    if (tab[i].wartosc === tab[i - 3].wartosc) {
      const newTab = dajPrzyklad(d, mus);
      return newTab;
    }
  }
  return tab;
};

const generateSample = ({
  isRequired,
  smallNumber,
  bigNumber,
  minDigits,
  maxDigits,
  minSamples,
  maxSamples,
  samples
}) => {
  const d = {
    duzy: smallNumber,
    maly: bigNumber
  };

  const czy_mus = isRequired;
  const maly = smallNumber;
  const duzy = bigNumber;

  const mus = {
    duzy: czy_mus ? duzy : 1,
    maly: czy_mus ? maly : 1,
    cyfry: -1,
    dlugosc: -1
  };

  const samplesResult = [];
  for (let i = 0; i < samples; i++) {
    d.cyfry = randomInteger(minDigits, maxDigits);
    d.dlugosc = randomInteger(minSamples, maxSamples);
    const result = dajPrzyklad(d, mus).map(
      sample => sample.zwrot * sample.wartosc
    );

    while (result.length < maxSamples) {
      result.unshift(0);
    }
    samplesResult.push(result);
  }

  return samplesResult;
};

/* const sampleData = {
    isRequired: 1,
    smallNumber: 10,
    bigNumber: 31,
    minSamples: 5,
    maxSamples: 8,
    minDigits: 3,
    maxDigits: 3,
    samples: 20
  }; */

export default {
  methods: {
    generateSample
  }
};
