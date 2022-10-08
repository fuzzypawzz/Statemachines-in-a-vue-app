import type { IProduct } from '@/components/product-list/product-list.types';

const db: IProduct[] = [
  {
    name: 'Blackberry X10',
    price: '3995,00',
    id: 1,
  },
  {
    name: 'iPhone 13 Pro Max',
    price: '10.000,00',
    id: 2,
  },
  {
    name: 'Google Pixel 2',
    price: '7.000,00',
    id: 3,
  },
  {
    name: 'Playstation 5',
    price: '3.500,00',
    id: 4,
  },
  {
    name: 'MacBook Pro M1 Pro Max',
    price: '17.800,00',
    id: 5,
  },
  {
    name: 'iPad Pro 12',
    price: '9.995,00',
    id: 6,
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
