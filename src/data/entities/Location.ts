import {Entity, PrimaryColumn, Column} from 'typeorm/browser';

@Entity({name: 'locations'})
export default class Location {
  @PrimaryColumn()
  id: string;

  @Column({type: 'varchar'})
  deviceId: string;

  @Column({type: 'int'})
  timestamp: number;

  @Column({type: 'float'})
  latitude: number;

  @Column({type: 'float'})
  longitude: number;

  @Column({type: 'boolean', default: false})
  isSynced: boolean;

  @Column({type: 'int', nullable: true})
  syncedTimestamp: number;
}
