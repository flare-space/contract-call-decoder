export function ensureLeading0x(param: string): string {
  if (param.length > 1) {
    let lead = param.slice(0, 2);
    if (lead === "0x") {
      return param;
    } else {
      return "0x" + param;
    }
  } else {
    return param;
  }
}

export function removeLeading0x(param: string): string {
  if (param.length > 1) {
    let lead = param.slice(0, 2);
    if (lead === "0x") {
      return param.slice(2, param.length);
    } else {
      return param;
    }
  } else {
    return param;
  }
}
