const FetchPost = (route, details, response, error) => {
  console.warn(details);
  fetch(global.apiUrl + route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  })
    .then(response => response.json())
    .then(responseData => {
      response(responseData);
    })
    .catch(err => error(err))
    .done();
};

const FetchGet = (route, details, response, error) => {
  fetch(global.apiUrl + route, {
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
