const URL = "https://translateme.com";
let fetching = false;

export default (type, filter, dateFilter, position) => {
    if (fetching) return Promise.reject(new Error('Request in progress'));
    fetching = true;
    return fetch(URL + `/search/${type}/${filter}/${dateFilter}/${position}/0/0`)
        .then(response => Promise.all([response, response.json()]))
        .then(([response, responseObj]) => {
            fetching = false;
            return [response, responseObj];
        })
        .catch(err => {
            fetching = false;
            return Promise.reject(err);
          })

}