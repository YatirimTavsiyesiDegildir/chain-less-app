const FetchPost = (route, details, response, error) => {
  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  fetch(global.ApiUrl + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  })
    .then(response => response.json())
    .then(responseData => {
      response(responseData);
    })
    .catch(error)
    .done();
};

const FetchGet = (route, details, response, error) => {
  let urlParams = '?';
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    urlParams += encodedKey + '=' + encodedValue + '&';
  }
  urlParams = urlParams.substring(0, urlParams.length - 1);
  fetch(global.ApiUrl + route + urlParams, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(responseData => {
      response(responseData);
    })
    .catch(error)
    .done();
};

const FetchPutPhoto = (target, details, response, error) => {
  const xhr = new XMLHttpRequest();
  let file = {uri: details.image.path};

  xhr.open('PUT', target);
  xhr.setRequestHeader('Content-Type', details.image.mime);
  xhr.setRequestHeader('x-amz-acl', 'public-read');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        response();
      } else {
        error(xhr);
      }
    }
  };
  xhr.send(file);
};

export {FetchPost, FetchGet, FetchPutPhoto};
