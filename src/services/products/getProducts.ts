import type { IProduct } from '@/components/product-list/product-list.types';

const db = [
  {
    name: 'Blackberry X10',
    price: '3995,00',
  },
  {
    name: 'iPhone 13 Pro Max',
    price: '10.000,00',
  },
  {
    name: 'Google Pixel 2',
    price: '7.000,00',
  },
  {
    name: 'Playstation 5',
    price: '3.500,00',
  },
  {
    name: 'MacBook Pro M1 Pro Max',
    price: '17.800,00',
  },
  {
    name: 'iPad Pro 12',
    price: '9.995,00',
  },
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomProductFromDb() {
  const randomIndex = getRandomInt(db.length);

  return db[randomIndex];
}

async function getProducts(): Promise<IProduct[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([getRandomProductFromDb()]);
    }, 1500);
  });
}

export { getProducts };
