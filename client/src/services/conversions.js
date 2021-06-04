
const cToF = (c) => {
  return c * (9/5) + 32;
};

export const convertTemp = (c, units) => {
  if (!c && c !== 0) {
    console.log("missing input temp!");
    return null;
  }

  if (units && units.toLowerCase() === "c") {
    return parseInt(c);
  } else if (units && units.toLowerCase() === "f") {
    return parseInt(cToF(c));
  } else {
    console.log("Missing / invalid target unit!", units);
    return null;
  }
};


const msToMph = (ms) => {
  return ms / 0.44704;
};


export const convertSpeed = (speed, units) => {
  if (!speed && speed !== 0) {
    console.log("missing input speed");
    return null;
  }
  if (units && units.toLowerCase() === "mph") {
    return parseInt(msToMph(speed));
  } else if (units && units.toLowerCase() === "ms") {
    return parseInt(speed);
  } else {
    console.log("Missing / invalid target unit!", units);
    return null;
  }
};


const mmToIn = (mm) => {
  return mm / 25.4;
};


export const convertLength = (len, units) => {
  if (!len && len !== 0) {
    console.log("missing input length!");
    return null;
  }
  if (units && units.toLowerCase() === "in") {
    return parseInt(mmToIn(len) * 100) / 100;
  } else if (units && units.toLowerCase() === "mm") {
    return len;
  } else {
    console.log("Missing / invalid target unit!", units);
    return null;
  }
};
