export const kFormatter2 = (num) => {
    return `${num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  };

  export const kFormatter = (val) =>  {
    return Math.abs(val) > 999999999
      ? `${Math.sign(val) * (Math.abs(val) / 1000000000).toFixed(1)}B`
      : Math.abs(val) > 999999
      ? `${Math.sign(val) * (Math.abs(val) / 1000000).toFixed(1)}M`
      : Math.abs(val) > 999
      ? `${Math.sign(val) * (Math.abs(val) / 1000).toFixed(1)}k`
      : Math.sign(val) * Math.abs(val);
  }
