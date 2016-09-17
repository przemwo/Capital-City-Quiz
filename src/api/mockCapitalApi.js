import delay from './delay';

const capitals = [
  {
    id: 1,
    capital: 'Warsaw',
    country: 'Poland'
  },
  {
    id: 2,
    capital: 'London',
    country: 'United Kingdom'
  },
  {
    id: 3,
    capital: 'Washington',
    country: 'United States of America'
  },
  {
    id: 4,
    capital: 'Berlin',
    country: 'Germany'
  },
  {
    id: 5,
    capital: 'Moscow',
    country: 'Russia'
  }
];

class CapitalApi {
  static getCapitals() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], capitals));
      }, delay);
    });
  }
}

export default CapitalApi;
