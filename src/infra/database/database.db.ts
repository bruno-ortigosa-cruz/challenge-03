import mongoose from 'mongoose';

export class Database {
    private uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    public async connect() {
        await mongoose.connect(this.uri);
    }
}
