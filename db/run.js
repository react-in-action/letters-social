import DB from './DB';

const server = DB();
server.listen(process.env.ENDPOINT_PORT || 3500, () => console.log('JSON Server is running'));
