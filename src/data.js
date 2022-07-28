export const services = [
  {
    _id: '625980d3fb40726227849a44',
    name: 'Cuci Kiloan',
    banner:
      'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
    price: 20000,
    city: 'Bekasi',
    distance: 0.1,
  },
  {
    _id: '625981c57d662e69f33225a5',
    name: 'Cuci Satuan',
    banner:
      'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
    price: 1,
    city: 'Bekasi',
    diskon: {
      typeDiskon: 'nominal',
      valueDiskon: 40000,
    },
    distance: 0.1,
  },
  {
    _id: '627945423f96c377ecc6eea7',
    name: 'cuci karpet',
    banner: 'http://localhost:8081/public/images/services/1652114754665.jpg',
    price: 60000,
    city: 'Bekasi',
    diskon: {
      typeDiskon: 'percent',
      valueDiskon: 8,
    },
    distance: 0.1,
  },
];

export const AllOrder = [
  {
    _id: '10001',
    service: {
      name: 'Cuci Kiloan',
      desc: 'Cuci pakaian dengan bayar per kilo',
      banner: [
        'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
        'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
        'http://localhost:8081/public/images/services/1652015661537.jpg',
      ],
      price: 20000,
      quantityType: 'kg',
      laundry: {
        name: 'Ahmad Laundry',
      },
      subServices: [],
      ratings: [],
      createdAt: '2022-04-15T21:27:31.627Z',
      updatedAt: '2022-05-11T13:43:26.770Z',
      __v: 0,
      promo: '627b25b2bf938091fd47273a',
    },
    sub_service: [
      {
        name: '',
        price: null,
        total: null,
        note: '',
        tag: '',
      },
    ],
    address: {
      city: 'Bekasi',
      street: 'Alun - alun bekasi',
      lat: -6.241150964717359,
      long: 107.00034567084127,
    },
    totalPrice: 92000,
    total: 5,
    note: 'ada bahan katun',
    payment: 'Cash on delivery',
    id_merchant: '6254ff4516a2682e80fa7b65',
    id_customer: '62590534b19da8da51f29cb6',
    progress: [
      {
        name: 'Confirmed',
        desc: 'Order telah dikonfirmasi oleh pihak laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cade',
      },
      {
        name: 'Picked up',
        desc: 'Pakaian telah dipickup oleh laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cadf',
      },
      {
        name: 'In Process',
        desc: '',
        status: '0',
        _id: '625ab43b5ec11fdd8806cae0',
      },
      {
        name: 'Shipped',
        desc: '',
        status: '0',
        _id: '625ab43b5ec11fdd8806cae1',
      },
      {
        name: 'Delivered',
        desc: '',
        status: '0',
        _id: '625ab43b5ec11fdd8806cae2',
      },
    ],
    createdAt: '2022-04-16T19:19:07.133Z',
    updatedAt: '2022-04-16T19:45:15.995Z',
    status: 'ongoing',
  },
  {
    _id: '10002',
    service: {
      name: 'Cuci Kiloan',
      desc: 'Cuci pakaian dengan bayar per kilo',
      banner: [
        'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
        'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
        'http://localhost:8081/public/images/services/1652015661537.jpg',
      ],
      price: 20000,
      quantityType: 'kg',
      laundry: {
        name: 'Ahmad Laundry',
      },
      subServices: [],
      ratings: [],
      createdAt: '2022-04-15T21:27:31.627Z',
      updatedAt: '2022-05-11T13:43:26.770Z',
      __v: 0,
      promo: '627b25b2bf938091fd47273a',
    },
    sub_service: [
      {
        name: '',
        price: null,
        total: null,
        note: '',
        tag: '',
      },
    ],
    address: {
      city: 'Bekasi',
      street: 'Alun - alun bekasi',
      lat: -6.241150964717359,
      long: 107.00034567084127,
    },
    totalPrice: 92000,
    total: 5,
    note: 'ada bahan katun',
    payment: 'Cash on delivery',
    id_merchant: '6254ff4516a2682e80fa7b65',
    id_customer: '62590534b19da8da51f29cb6',
    progress: [
      {
        name: 'Confirmed',
        desc: 'Order telah dikonfirmasi oleh pihak laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cade',
      },
      {
        name: 'Picked up',
        desc: 'Pakaian telah dipickup oleh laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cadf',
      },
      {
        name: 'In Process',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae0',
      },
      {
        name: 'Shipped',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae1',
      },
      {
        name: 'Delivered',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae2',
      },
    ],
    createdAt: '2022-04-16T19:19:07.133Z',
    updatedAt: '2022-04-16T19:45:15.995Z',
    status: 'done',
  },
  {
    _id: '10002',
    service: {
      name: 'Cuci Kiloan',
      desc: 'Cuci pakaian dengan bayar per kilo',
      banner: [
        'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
        'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
        'http://localhost:8081/public/images/services/1652015661537.jpg',
      ],
      price: 20000,
      quantityType: 'kg',
      laundry: {
        name: 'Ahmad Laundry',
      },
      subServices: [],
      ratings: [],
      createdAt: '2022-04-15T21:27:31.627Z',
      updatedAt: '2022-05-11T13:43:26.770Z',
      __v: 0,
      promo: '627b25b2bf938091fd47273a',
    },
    sub_service: [
      {
        name: '',
        price: null,
        total: null,
        note: '',
        tag: '',
      },
    ],
    address: {
      city: 'Bekasi',
      street: 'Alun - alun bekasi',
      lat: -6.241150964717359,
      long: 107.00034567084127,
    },
    totalPrice: 92000,
    total: 5,
    note: 'ada bahan katun',
    payment: 'Cash on delivery',
    id_merchant: '6254ff4516a2682e80fa7b65',
    id_customer: '62590534b19da8da51f29cb6',
    progress: [
      {
        name: 'Confirmed',
        desc: 'Order telah dikonfirmasi oleh pihak laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cade',
      },
      {
        name: 'Picked up',
        desc: 'Pakaian telah dipickup oleh laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cadf',
      },
      {
        name: 'In Process',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae0',
      },
      {
        name: 'Shipped',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae1',
      },
      {
        name: 'Delivered',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae2',
      },
    ],
    createdAt: '2022-04-16T19:19:07.133Z',
    updatedAt: '2022-04-16T19:45:15.995Z',
    status: 'done',
  },
  {
    _id: '10002',
    service: {
      name: 'Cuci Kiloan',
      desc: 'Cuci pakaian dengan bayar per kilo',
      banner: [
        'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
        'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
        'http://localhost:8081/public/images/services/1652015661537.jpg',
      ],
      price: 20000,
      quantityType: 'kg',
      laundry: {
        name: 'Ahmad Laundry',
      },
      subServices: [],
      ratings: [],
      createdAt: '2022-04-15T21:27:31.627Z',
      updatedAt: '2022-05-11T13:43:26.770Z',
      __v: 0,
      promo: '627b25b2bf938091fd47273a',
    },
    sub_service: [
      {
        name: '',
        price: null,
        total: null,
        note: '',
        tag: '',
      },
    ],
    address: {
      city: 'Bekasi',
      street: 'Alun - alun bekasi',
      lat: -6.241150964717359,
      long: 107.00034567084127,
    },
    totalPrice: 92000,
    total: 5,
    note: 'ada bahan katun',
    payment: 'Cash on delivery',
    id_merchant: '6254ff4516a2682e80fa7b65',
    id_customer: '62590534b19da8da51f29cb6',
    progress: [
      {
        name: 'Confirmed',
        desc: 'Order telah dikonfirmasi oleh pihak laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cade',
      },
      {
        name: 'Picked up',
        desc: 'Pakaian telah dipickup oleh laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cadf',
      },
      {
        name: 'In Process',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae0',
      },
      {
        name: 'Shipped',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae1',
      },
      {
        name: 'Delivered',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae2',
      },
    ],
    createdAt: '2022-04-16T19:19:07.133Z',
    updatedAt: '2022-04-16T19:45:15.995Z',
    status: 'done',
  },
  {
    _id: '10002',
    service: {
      name: 'Cuci Kiloan',
      desc: 'Cuci pakaian dengan bayar per kilo',
      banner: [
        'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
        'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
        'http://localhost:8081/public/images/services/1652015661537.jpg',
      ],
      price: 20000,
      quantityType: 'kg',
      laundry: {
        name: 'Ahmad Laundry',
      },
      subServices: [],
      ratings: [],
      createdAt: '2022-04-15T21:27:31.627Z',
      updatedAt: '2022-05-11T13:43:26.770Z',
      __v: 0,
      promo: '627b25b2bf938091fd47273a',
    },
    sub_service: [
      {
        name: '',
        price: null,
        total: null,
        note: '',
        tag: '',
      },
    ],
    address: {
      city: 'Bekasi',
      street: 'Alun - alun bekasi',
      lat: -6.241150964717359,
      long: 107.00034567084127,
    },
    totalPrice: 92000,
    total: 5,
    note: 'ada bahan katun',
    payment: 'Cash on delivery',
    id_merchant: '6254ff4516a2682e80fa7b65',
    id_customer: '62590534b19da8da51f29cb6',
    progress: [
      {
        name: 'Confirmed',
        desc: 'Order telah dikonfirmasi oleh pihak laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cade',
      },
      {
        name: 'Picked up',
        desc: 'Pakaian telah dipickup oleh laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cadf',
      },
      {
        name: 'In Process',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae0',
      },
      {
        name: 'Shipped',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae1',
      },
      {
        name: 'Delivered',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae2',
      },
    ],
    createdAt: '2022-04-16T19:19:07.133Z',
    updatedAt: '2022-04-16T19:45:15.995Z',
    status: 'done',
  },
  {
    _id: '10002',
    service: {
      name: 'Cuci Kiloan',
      desc: 'Cuci pakaian dengan bayar per kilo',
      banner: [
        'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
        'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
        'http://localhost:8081/public/images/services/1652015661537.jpg',
      ],
      price: 20000,
      quantityType: 'kg',
      laundry: {
        name: 'Ahmad Laundry',
      },
      subServices: [],
      ratings: [],
      createdAt: '2022-04-15T21:27:31.627Z',
      updatedAt: '2022-05-11T13:43:26.770Z',
      __v: 0,
      promo: '627b25b2bf938091fd47273a',
    },
    sub_service: [
      {
        name: '',
        price: null,
        total: null,
        note: '',
        tag: '',
      },
    ],
    address: {
      city: 'Bekasi',
      street: 'Alun - alun bekasi',
      lat: -6.241150964717359,
      long: 107.00034567084127,
    },
    totalPrice: 92000,
    total: 5,
    note: 'ada bahan katun',
    payment: 'Cash on delivery',
    id_merchant: '6254ff4516a2682e80fa7b65',
    id_customer: '62590534b19da8da51f29cb6',
    progress: [
      {
        name: 'Confirmed',
        desc: 'Order telah dikonfirmasi oleh pihak laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cade',
      },
      {
        name: 'Picked up',
        desc: 'Pakaian telah dipickup oleh laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cadf',
      },
      {
        name: 'In Process',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae0',
      },
      {
        name: 'Shipped',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae1',
      },
      {
        name: 'Delivered',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae2',
      },
    ],
    createdAt: '2022-04-16T19:19:07.133Z',
    updatedAt: '2022-04-16T19:45:15.995Z',
    status: 'done',
  },
  {
    _id: '10002',
    service: {
      name: 'Cuci Kiloan',
      desc: 'Cuci pakaian dengan bayar per kilo',
      banner: [
        'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
        'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
        'http://localhost:8081/public/images/services/1652015661537.jpg',
      ],
      price: 20000,
      quantityType: 'kg',
      laundry: {
        name: 'Ahmad Laundry',
      },
      subServices: [],
      ratings: [],
      createdAt: '2022-04-15T21:27:31.627Z',
      updatedAt: '2022-05-11T13:43:26.770Z',
      __v: 0,
      promo: '627b25b2bf938091fd47273a',
    },
    sub_service: [
      {
        name: '',
        price: null,
        total: null,
        note: '',
        tag: '',
      },
    ],
    address: {
      city: 'Bekasi',
      street: 'Alun - alun bekasi',
      lat: -6.241150964717359,
      long: 107.00034567084127,
    },
    totalPrice: 92000,
    total: 5,
    note: 'ada bahan katun',
    payment: 'Cash on delivery',
    id_merchant: '6254ff4516a2682e80fa7b65',
    id_customer: '62590534b19da8da51f29cb6',
    progress: [
      {
        name: 'Confirmed',
        desc: 'Order telah dikonfirmasi oleh pihak laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cade',
      },
      {
        name: 'Picked up',
        desc: 'Pakaian telah dipickup oleh laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cadf',
      },
      {
        name: 'In Process',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae0',
      },
      {
        name: 'Shipped',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae1',
      },
      {
        name: 'Delivered',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae2',
      },
    ],
    createdAt: '2022-04-16T19:19:07.133Z',
    updatedAt: '2022-04-16T19:45:15.995Z',
    status: 'done',
  },
  {
    _id: '10002',
    service: {
      name: 'Cuci Kiloan',
      desc: 'Cuci pakaian dengan bayar per kilo',
      banner: [
        'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
        'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
        'http://localhost:8081/public/images/services/1652015661537.jpg',
      ],
      price: 20000,
      quantityType: 'kg',
      laundry: {
        name: 'Ahmad Laundry',
      },
      subServices: [],
      ratings: [],
      createdAt: '2022-04-15T21:27:31.627Z',
      updatedAt: '2022-05-11T13:43:26.770Z',
      __v: 0,
      promo: '627b25b2bf938091fd47273a',
    },
    sub_service: [
      {
        name: '',
        price: null,
        total: null,
        note: '',
        tag: '',
      },
    ],
    address: {
      city: 'Bekasi',
      street: 'Alun - alun bekasi',
      lat: -6.241150964717359,
      long: 107.00034567084127,
    },
    totalPrice: 92000,
    total: 5,
    note: 'ada bahan katun',
    payment: 'Cash on delivery',
    id_merchant: '6254ff4516a2682e80fa7b65',
    id_customer: '62590534b19da8da51f29cb6',
    progress: [
      {
        name: 'Confirmed',
        desc: 'Order telah dikonfirmasi oleh pihak laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cade',
      },
      {
        name: 'Picked up',
        desc: 'Pakaian telah dipickup oleh laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cadf',
      },
      {
        name: 'In Process',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae0',
      },
      {
        name: 'Shipped',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae1',
      },
      {
        name: 'Delivered',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae2',
      },
    ],
    createdAt: '2022-04-16T19:19:07.133Z',
    updatedAt: '2022-04-16T19:45:15.995Z',
    status: 'done',
  },
  {
    _id: '10002',
    service: {
      name: 'Cuci Kiloan',
      desc: 'Cuci pakaian dengan bayar per kilo',
      banner: [
        'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
        'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
        'http://localhost:8081/public/images/services/1652015661537.jpg',
      ],
      price: 20000,
      quantityType: 'kg',
      laundry: {
        name: 'Ahmad Laundry',
      },
      subServices: [],
      ratings: [],
      createdAt: '2022-04-15T21:27:31.627Z',
      updatedAt: '2022-05-11T13:43:26.770Z',
      __v: 0,
      promo: '627b25b2bf938091fd47273a',
    },
    sub_service: [
      {
        name: '',
        price: null,
        total: null,
        note: '',
        tag: '',
      },
    ],
    address: {
      city: 'Bekasi',
      street: 'Alun - alun bekasi',
      lat: -6.241150964717359,
      long: 107.00034567084127,
    },
    totalPrice: 92000,
    total: 5,
    note: 'ada bahan katun',
    payment: 'Cash on delivery',
    id_merchant: '6254ff4516a2682e80fa7b65',
    id_customer: '62590534b19da8da51f29cb6',
    progress: [
      {
        name: 'Confirmed',
        desc: 'Order telah dikonfirmasi oleh pihak laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cade',
      },
      {
        name: 'Picked up',
        desc: 'Pakaian telah dipickup oleh laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cadf',
      },
      {
        name: 'In Process',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae0',
      },
      {
        name: 'Shipped',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae1',
      },
      {
        name: 'Delivered',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae2',
      },
    ],
    createdAt: '2022-04-16T19:19:07.133Z',
    updatedAt: '2022-04-16T19:45:15.995Z',
    status: 'done',
  },
  {
    _id: '10003',
    service: {
      name: 'Cuci Kiloan',
      desc: 'Cuci pakaian dengan bayar per kilo',
      banner: [
        'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
        'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
        'http://localhost:8081/public/images/services/1652015661537.jpg',
      ],
      price: 20000,
      quantityType: 'kg',
      laundry: {
        name: 'Ahmad Laundry',
      },
      subServices: [],
      ratings: [],
      createdAt: '2022-04-15T21:27:31.627Z',
      updatedAt: '2022-05-11T13:43:26.770Z',
      __v: 0,
      promo: '627b25b2bf938091fd47273a',
    },
    sub_service: [
      {
        name: '',
        price: null,
        total: null,
        note: '',
        tag: '',
      },
    ],
    address: {
      city: 'Bekasi',
      street: 'Alun - alun bekasi',
      lat: -6.241150964717359,
      long: 107.00034567084127,
    },
    totalPrice: 92000,
    total: 5,
    note: 'ada bahan katun',
    payment: 'Cash on delivery',
    id_merchant: '6254ff4516a2682e80fa7b65',
    id_customer: '62590534b19da8da51f29cb6',
    progress: [
      {
        name: 'Confirmed',
        desc: 'Order telah dikonfirmasi oleh pihak laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cade',
      },
      {
        name: 'Picked up',
        desc: 'Pakaian telah dipickup oleh laundry',
        status: '1',
        _id: '625ab43b5ec11fdd8806cadf',
      },
      {
        name: 'In Process',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae0',
      },
      {
        name: 'Shipped',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae1',
      },
      {
        name: 'Delivered',
        desc: '',
        status: '1',
        _id: '625ab43b5ec11fdd8806cae2',
      },
    ],
    createdAt: '2022-04-16T19:19:07.133Z',
    updatedAt: '2022-04-16T19:45:15.995Z',
    status: 'done',
  },
];

export const order = {
  _id: '1001',
  service: {
    name: 'Cuci Kiloan',
    desc: 'Cuci pakaian dengan bayar per kilo',
    banner: [
      'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
      'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
      'http://localhost:8081/public/images/services/1652015661537.jpg',
    ],
    price: 20000,
    quantityType: 'kg',
    laundry: '625946b425e8f31fa164a050',
    subServices: [],
    ratings: [],
    createdAt: '2022-04-15T21:27:31.627Z',
    updatedAt: '2022-05-11T13:43:26.770Z',
    __v: 0,
    promo: '627b25b2bf938091fd47273a',
  },
  sub_service: [
    {
      name: '',
      price: null,
      total: null,
      note: '',
      tag: '',
    },
  ],
  address: {
    city: 'Bekasi',
    street: 'Alun - alun bekasi',
    lat: -6.241150964717359,
    long: 107.00034567084127,
  },
  totalPrice: 92000,
  total: 5,
  note: 'ada bahan katun',
  payment: 'Cash on delivery',
  id_merchant: '6254ff4516a2682e80fa7b65',
  id_customer: '62590534b19da8da51f29cb6',
  progress: [
    {
      name: 'Confirmed',
      desc: 'Order telah dikonfirmasi oleh pihak laundry',
      status: '1',
      _id: '625ab43b5ec11fdd8806cade',
    },
    {
      name: 'Picked up',
      desc: 'Pakaian telah dipickup oleh laundry',
      status: '1',
      _id: '625ab43b5ec11fdd8806cadf',
    },
    {
      name: 'In Process',
      desc: '',
      status: '0',
      _id: '625ab43b5ec11fdd8806cae0',
    },
    {
      name: 'Shipped',
      desc: '',
      status: '0',
      _id: '625ab43b5ec11fdd8806cae1',
    },
    {
      name: 'Delivered',
      desc: '',
      status: '0',
      _id: '625ab43b5ec11fdd8806cae2',
    },
  ],
  createdAt: '2022-04-16T19:19:07.133Z',
  updatedAt: '2022-04-16T19:45:15.995Z',
  status: 'ongoing',
};

export const ratings = [
  {
    name: 'Tri Hariyadi',
    rating: 3,
    comment: 'Pelayanan kurang ramah, pakaian saya juga ada hilang satu',
    id_service: {
      _id: '625981c57d662e69f33225a5',
      name: 'Cuci Satuan',
    },
    sub_service: 'Blazer',
    createdAt: '2022-04-16T12:04:04.622Z',
    updatedAt: '2022-04-16T12:04:04.622Z',
  },
  {
    name: 'Ummi Aida',
    rating: 5,
    comment: 'Pelayanan bagus, pakaian wangi dan harum, recommanded pokoknya',
    id_service: {
      _id: '625981c57d662e69f33225a5',
      name: 'Cuci Satuan',
    },
    sub_service: 'Blazer',
    createdAt: '2022-04-16T12:13:28.379Z',
    updatedAt: '2022-04-16T12:13:28.379Z',
  },
  {
    name: 'Ujumaki Narto',
    rating: 5,
    comment:
      'Mantap, jaket jeans saya jadi wangi dan harum, rapih lagi, recommanded pokoknya',
    id_service: {
      _id: '625981c57d662e69f33225a5',
      name: 'Cuci Satuan',
    },
    sub_service: 'Jaket Jeans',
    createdAt: '2022-04-16T12:16:39.686Z',
    updatedAt: '2022-04-16T12:16:39.686Z',
  },
];

export const service1 = {
  _id: '625981c57d662e69f33225a5',
  name: 'Cuci Satuan',
  desc: 'Dihitung per satuan pakaian untuk pembayaran',
  banner: [
    'http://192.168.43.229:8081/public/images/services/1650034888125.jpg',
    'http://192.168.43.229:8081/public/images/services/1650032851610.jpg',
    'http://localhost:8081/public/images/services/1651991363684.jpg',
  ],
  price: 1,
  quantityType: 'satuan',
  laundry: {
    user_id: {
      _id: '6254ff4516a2682e80fa7b65',
      fullName: 'Ahmad Jaelani',
      email: 'ahmadjaelani@gmail.com',
      phoneNumber: '089660278221',
      address: {
        city: 'Bekasi',
        street: 'Alun - alun bekasi',
        lat: -6.241150964717359,
        long: 107.00034567084127,
      },
    },
    name: 'Jaelani Laundry',
    domain: 'https://localhost:3006/laundry/jaelani_laundry',
  },
  subServices: [
    {
      name: 'Blazer',
      price: 44000,
      banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
      type: 'Men',
      _id: '1',
    },
    {
      name: 'Blazer',
      price: 44000,
      banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
      type: 'Men',
      _id: '2',
    },
    {
      name: 'Blazer',
      price: 44000,
      banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
      type: 'Men',
      _id: '3',
    },
    {
      name: 'Blazer',
      price: 44000,
      banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
      type: 'Men',
      _id: '4',
    },
    {
      name: 'Blazer',
      price: 44000,
      banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
      type: 'Men',
      _id: '5',
    },
    {
      name: 'Blazer',
      price: 44000,
      banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
      type: 'Men',
      _id: '6',
    },
    {
      name: 'Blazer',
      price: 44000,
      banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
      type: 'Men',
      _id: '7',
    },
    {
      name: 'Blazer',
      price: 44000,
      banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
      type: 'Men',
      _id: '8',
    },
    {
      name: 'Blazer',
      price: 44000,
      banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
      type: 'Men',
      _id: '9',
    },
    {
      name: 'Blazer',
      price: 44000,
      banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
      type: 'Men',
      _id: '10',
    },
    {
      name: 'Jaket Jeans',
      price: 40000,
      banner: 'http://localhost:8081/public/images/services/1650086122132.jpg',
      type: 'Woman',
      _id: '625a50ea95413550b0b43869',
    },
  ],
  createdAt: '2022-04-15T21:31:33.703Z',
  updatedAt: '2022-05-09T20:39:04.702Z',
  promo: null,
  distance: 0.1,
  ratingAverage: 4.333333333333333,
};

export const profile = {
  _id: '6254ff4516a2682e80fa7b65',
  fullName: 'Ahmad Jaelani',
  email: 'ahmadjaelani@gmail.com',
  phoneNumber: '089660278221',
  address: {
    city: 'Bekasi',
    street: 'Alun - alun bekasi',
    lat: -6.241150964717359,
    long: 107.00034567084127,
  },
  role: {
    _id: '624d2816e137a7bb54107fc3',
    code: 1,
    name: 'Pengusaha Laundry',
    description:
      'User yang mempunyai laundry dan mempromosikan usahanya di smart laundry',
  },
  createdAt: '2022-04-12T11:25:41.354Z',
  updatedAt: '2022-04-12T11:25:41.354Z',
  laundry: {
    _id: '625946b425e8f31fa164a050',
    name: 'Jaelani Laundry',
    domain: 'https://localhost:3006/laundry/jaelani_laundry',
  },
};

export const subServicesMen = [
  {
    name: 'Blazer',
    price: 44000,
    banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
    type: 'Men',
    _id: '1',
  },
  {
    name: 'Blazer',
    price: 44000,
    banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
    type: 'Men',
    _id: '2',
  },
  {
    name: 'Blazer',
    price: 44000,
    banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
    type: 'Men',
    _id: '3',
  },
  {
    name: 'Blazer',
    price: 44000,
    banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
    type: 'Men',
    _id: '4',
  },
  {
    name: 'Blazer',
    price: 44000,
    banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
    type: 'Men',
    _id: '5',
  },
  {
    name: 'Blazer',
    price: 44000,
    banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
    type: 'Men',
    _id: '6',
  },
  {
    name: 'Blazer',
    price: 44000,
    banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
    type: 'Men',
    _id: '7',
  },
  {
    name: 'Blazer',
    price: 44000,
    banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
    type: 'Men',
    _id: '8',
  },
  {
    name: 'Blazer',
    price: 44000,
    banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
    type: 'Men',
    _id: '9',
  },
  {
    name: 'Blazer',
    price: 44000,
    banner: 'http://localhost:8081/public/images/services/1650059068648.jpg',
    type: 'Men',
    _id: '10',
  },
];
