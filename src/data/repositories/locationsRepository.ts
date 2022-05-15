import {Repository, DataSource} from 'typeorm';
import LocationModel from '../entities/Location';
import uuid from 'react-native-uuid';

interface ICreateLocationData {
  deviceId: string;
  timestamp: number;
  latitude: number;
  longitude: number;
}

export default class LocationsRepository {
  private ormRepository: Repository<LocationModel>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(LocationModel);
  }

  public async getAll(): Promise<LocationModel[]> {
    const locations = await this.ormRepository.find();
    return locations;
  }

  public async create({
    deviceId,
    timestamp,
    longitude,
    latitude,
  }: ICreateLocationData): Promise<LocationModel> {
    const location = this.ormRepository.create({
      id: uuid.v4() as string,
      deviceId,
      timestamp,
      longitude,
      latitude,
      isSynced: false,
    });

    console.log(location);

    await this.ormRepository.save(location);

    return location;
  }

  public async toggleSynced(id: string): Promise<void> {
    await this.ormRepository.update({isSynced: true}, {id});
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async deleteAll(): Promise<void> {
    await this.ormRepository.delete({});
  }
}
