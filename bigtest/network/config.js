export default function configure() {
  this.urlPrefix = 'https://api.frontside.io/v1';

  this.post('/requests');

  this.get('/requests');

  this.get('/requests/:id');

  this.put('/requests/:id', ({ requests }, netReq) => {
    let payload = JSON.parse(netReq.requestBody);
    let record = requests.find(netReq.params.id); 
    return record.update(payload);
  });

  this.del('/requests/:id');
}
