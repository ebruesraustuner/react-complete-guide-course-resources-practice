export async function fetchMeals() {
  const response = await fetch('http://localhost:3000/meals');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Hay Aksi Yemekler Gelemedi');
  }

  return resData;
}


export async function postOrders(payload) {
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Hay Aksi');
  }

  return resData;
}

