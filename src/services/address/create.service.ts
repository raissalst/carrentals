import { Address } from '../../entities/Address';
import { AddressRepository } from '../../repositories';

const createAddressService = async (address: Address) => {
  try {
    const newAddress = await new AddressRepository().saveAddress(address);
    return newAddress;
  } catch (err: any) {
    return err;
  }
};

export default createAddressService;
