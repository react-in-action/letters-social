let DB;_bac‍.w('./DB',[["default",function(v){DB=v}]]);

const server = DB();
server.listen(process.env.ENDPOINT_PORT || 3500, () => console.log('JSON Server is running'));
