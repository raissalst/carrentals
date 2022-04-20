// import { AddressRepository } from '../../repositories';
// import { expect, describe, it, beforeAll, afterAll } from '@jest/globals';
// import { connection } from '..';

// beforeAll(async () => {
//   await connection.create();
// });

// afterAll(async () => {
//   await connection.clearTables();
//   await connection.dropTables();
//   await connection.close();
// });

// describe('Address repository tests', () => {
//   const addressMock = {
//     id: '563fb10f-084e-4abd-a6f5-09293cd24cbf',
//     address: 'Rua josé da silva',
//     state: 'São Paulo',
//     city: 'Socorro',
//     country: 'Brasil',
//   };
//   it('create address', async () => {
//     const address = await new AddressRepository().saveAddress(addressMock);

//     expect(address).toBeTruthy();
//     expect(address).toStrictEqual(addressMock);
//   });

//   it('get all addreses', async () => {
//     const address = await new AddressRepository().getAllAddreses();

//     expect(address.length).toBe(1);
//   });

//   it('get address by id', async () => {
//     const address = await new AddressRepository().getAddressById(
//       addressMock.id
//     );

//     expect(Object.keys(address)).toStrictEqual(Object.keys(addressMock));
//   });

//   it('update address', async () => {
//     const response = await new AddressRepository().updateAddress(
//       addressMock.id,
//       { address: 'Rua João Pedro' }
//     );

//     expect(response.affected).toBe(1);

//     const address = await new AddressRepository().getAddressById(
//       addressMock.id
//     );

//     expect(address.address).toStrictEqual('Rua João Pedro');
//   });
// });
