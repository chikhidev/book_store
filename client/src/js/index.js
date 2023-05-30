const display = (text, n) => {
    let len = text.length;
    let long = false;
    if (len > n)
    {
      long = true
      len = n;
    }
    else {
    }
    let processed = "";
    for (let i = 0; i < len; i++)
    {
      processed += text[i];
    }
    return (long ? processed + "..." : processed);
}

const capitalize = (str) => {
  if ( str.length != 1 ) 
    return str[0].toUpperCase() + str.slice(1)
  return str.toUpperCase();
}






let swiperBreakPoints = {
    1666: {
    slidesPerView: 6,
    },
    1366: {
    slidesPerView: 5,
    },
    1000: {
    slidesPerView: 4,
    },
    768: {
    width: 768,
    slidesPerView: 3,
    },
    400: {
    slidesPerView : 2
    },
    200: {
        slidesPerView : 1
    }
}

export {display, capitalize, swiperBreakPoints}
