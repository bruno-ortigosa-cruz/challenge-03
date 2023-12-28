import 'dotenv/config';
import { IEnv } from './helpers/interfaces/env.interface';
import { cleanEnv, port, str } from 'envalid';
import { App } from './app';
import { Database } from './infra/database/database.db';

class Server {
    private prefix: string = '/api/v1';
    private env: IEnv;
    private express: App;
    private database: Database;

    constructor() {
        this.env = this.validateEnv();
        this.express = new App(this.prefix);
        this.database = new Database(this.env.MONGO_URI);
    }

    public start() {
        this.express.app.listen(this.env.PORT, async () => {
            await this.database.connect().then(() => {
                console.log(`Server is listening on port ${this.env.PORT}...`);
            });
        });
    }

    private validateEnv(): IEnv {
        const env = cleanEnv(process.env, {
            MONGO_URI: str(),
            PORT: port({ default: 3000 }),
        }) as IEnv;

        return env;
    }
}

const server = new Server();
server.start();
