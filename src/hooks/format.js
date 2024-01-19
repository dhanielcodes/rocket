export const CFormatter = (num) => {
    return `${num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  };

  export const CFormatterNaira = (num) => {
    return `₦${num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
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

  export const kFormatterNaira = (val) =>  {
    return Math.abs(val) > 999999999
      ? `₦ ${Math.sign(val) * (Math.abs(val) / 1000000000).toFixed(1)}B`
      : Math.abs(val) > 999999
      ? `₦${Math.sign(val) * (Math.abs(val) / 1000000).toFixed(1)}M`
      : Math.abs(val) > 999
      ? `₦${Math.sign(val) * (Math.abs(val) / 1000).toFixed(1)}k`
      :`₦${ Math.sign(val) * Math.abs(val)}`;
  }

  export const sumUp = (array) => {
    if(array?.length){
      return array?.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);

    }else{
      return [0,0,0]?.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
      }, 0);
    }
  };


  export const innerH = window.innerHeight;
