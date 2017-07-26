const { Stuff, Assembler, Essence } = require('./stuff');
const net = require('net');




class StuffClient {

    constructor(host, port) {
        this.host = host;
        this.port = port;
    }

    instanceRequest(interfaceName, methodIdent, componentCode) {
        return Stuff.instanceRequest(interfaceName, methodIdent, componentCode);
    }

    instanceEssence(mark, byteBuffer) {
        return new Essence(JSON.stringify(mark), byteBuffer);
    }

    send(stuff) {
        return new Promise((resolve) => {
            this.sendc(stuff, (resp) => {
                console.log(resp);
                if(resp.head.success){
                    resolve(resp);
                }else{
                    let response=resp.object;
                    Object.assign(response,{assignUniqueSecretMessage:resp.head.information});
                    resp.object=response;
                    resolve(resp);
                }
                });
        });
    }

    sendc(stuff, oper) {
        let response;
        const assembler = new Assembler()
        const client = net.connect({ port: this.port, host: this.host }, () => {
            console.log('与服务器建立连接');
            assembler.write(stuff, client);
        });
        client.on('data', (data) => {
            assembler.readFragment(data);
        });
        client.on('end', () => {
            client.end();
            try {
                response = assembler.read();
                console.log('服务器接口调用完成');
                oper(response);
            } catch (ex) {
                console.log(ex);
                console.log('服务器故障！');
                response = Stuff.instanceFault('服务器故障！');
                oper(response);
            }
        });
        client.on('error', (err) => {
            console.log('网络连接故障');
            response = Stuff.instanceFault('服务器故障！');
            oper(response);
        });
    }

}


module.exports = { StuffClient }