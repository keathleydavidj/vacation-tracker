export default function defaultScenario(server) {
  // Create server data by default
  server.create('request', {
    owner: 'Larry',
    status: 'Approved',
    startDate: '2019-01-02T00:00:00.000Z',
    endDate: '2020-01-01T00:00:00.000Z'
  });
  server.createList('request', 3);
}
