import { Repository, getRepository, UpdateResult } from 'typeorm';
import { Address } from '../../entities/Address';

interface IUpdateAddressData {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
}

interface IAddressRepo {
  saveAddress: (address: Address) => Promise<Address>;
  getAllAddreses: () => Promise<Address[]>;
  getAddressById: (id: string) => Promise<Address>;
  updateAddress: (
    id: string,
    updateData: IUpdateAddressData
  ) => Promise<UpdateResult>;
}

class AddressRepository implements IAddressRepo {
  private ormRepo: Repository<Address>;

  constructor() {
    this.ormRepo = getRepository(Address);
  }

  saveAddress = async (address: Address) => await this.ormRepo.save(address);

  getAllAddreses = async () => await this.ormRepo.find();

  getAddressById = async (id: string) => await this.ormRepo.findOne(id);

  updateAddress = async (id: string, updateData: IUpdateAddressData) =>
    await this.ormRepo
      .createQueryBuilder()
      .update(Address)
      .set(updateData)
      .where({ id: id })
      .returning('*')
      .execute();
}

export { AddressRepository, IAddressRepo, IUpdateAddressData };
