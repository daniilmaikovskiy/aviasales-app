export default class AviasalesService {
  url = 'https://front-test.beta.aviasales.ru';

  getSearchId = () => {
    return fetch(`${this.url}/search`)
      .then((response) => response.json())
      .then(({ searchId }) => searchId);
  };

  getTickets = (searchId) => {
    return fetch(`${this.url}/tickets?searchId=${searchId}`).then((response) => {
      if (response.status === 404) {
        throw new Error('404');
      }

      return response.json();
    });
  };
}
