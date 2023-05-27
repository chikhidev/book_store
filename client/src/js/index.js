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



export {display, capitalize}

