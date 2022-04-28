import { Address } from '../../entities/Address';
import { AddressRepository } from '../../repositories';

const updateAddressProfileService = async (id: string, address: Address) => {
  try {
    const updatedAddress = await new AddressRepository().updateAddress(id, address);
    
    return updatedAddress.raw[0];
  } catch (err: any) {
    return err;
  }
};

export default updateAddressProfileService;
