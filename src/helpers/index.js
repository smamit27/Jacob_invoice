export function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function jsonStringParse (value = '', defaultData = []) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return defaultData
  }
}

export function generateRandomString(stringLength = 10) {
  let randomString = '';
  let randomAscii;
  const asciiLow = 65;
  const asciiHigh = 90
  for (let i = 0; i < stringLength; i += 1) {
    randomAscii = Math.floor((Math.random() * (asciiHigh - asciiLow)) + asciiLow);
    randomString += String.fromCharCode(randomAscii)
  }
  return randomString
}

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

function dynamicSortMultiple(...args) {
  var props = args;
  return function (obj1, obj2) {
      var i = 0, result = 0, numberOfProperties = props.length;
      while(result === 0 && i < numberOfProperties) {
          result = dynamicSort(props[i])(obj1, obj2);
          i++;
      }
      return result;
  }
}

export class sortLevelData extends Array {
  sortBy(...args) {
      return this.sort(dynamicSortMultiple(...args));
  }
}

export function formFilterQuery (filters = []) {
  if (filters.length) {
    const localFilter = []
    const udfFilter = []
    filters.forEach((d) => {
      if (d.udf === 'Y') {
        udfFilter.push(`((UPPER(UDF_VALUE) LIKE UPPER('%${d.value}%')) AND (UPPER(UDF_ID) LIKE UPPER('%${d.key}%')))`)
      } else {
        localFilter.push(`(UPPER(${d.key}) LIKE UPPER('%${d.value}%'))`)
      }
    })
    return {
      ...(localFilter.length ? { localFilter: `(${localFilter.join(' OR ')})` } : {}),
      ...(udfFilter.length ? { udfFilter: `(${udfFilter.join(' OR ')})` } : {})
    }
  }
  return {}
} 