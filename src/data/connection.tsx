import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {ActivityIndicator} from 'react-native';
import {DataSource} from 'typeorm';
import Location from './entities/Location';
import LocationsRepository from './repositories/locationsRepository';

interface DatabaseConnectionContextData {
  locationsRepository: LocationsRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData,
);

export const DatabaseConnectionProvider: React.FC = ({children}) => {
  const [connection, setConnection] = useState<DataSource | null>(null);

  const connect = useCallback(async () => {
    // TODO:
    const dataSource = new DataSource({
      type: 'react-native',
      database: 'locator',
      location: 'default',
      logging: ['query', 'error', 'schema'],
      entities: [Location],
      // If you're not using migrations also set this to true
      // TODO: Use migrations in prod
      synchronize: true,
    });
    await dataSource.initialize();
    setConnection(dataSource);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return <ActivityIndicator />;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        locationsRepository: new LocationsRepository(connection),
      }}>
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);

  return context;
}
