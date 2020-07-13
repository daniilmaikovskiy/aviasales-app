export default class AviasalesService {
  url = 'https://front-test.beta.aviasales.ru';

  getSearchId = () => {
    return fetch(`${this.url}/search`)
      .then((response) => response.json())
      .then(({ searchId }) => searchId);
  };
}
