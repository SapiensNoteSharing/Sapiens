import { env } from '$env/dynamic/private';

const config = {
    /*
    auth: {
        host: env.AUTH_HOST || 'http://link:port',
        realm: env.AUTH_REALM || 'realm',
        clientid: env.AUTH_CLIENT_ID || 'cleintid',
        resourceManager: 'resource-manager',
        callback: env.AUTH_CALLBACK || 'http://localhost:5173/callback'
    },
    */
    mongoUrl: env.MONGODB_URL || 'mongodb://127.0.0.1:27017/Sapiens',
    git: {
        owner: 'Falesteo',
        repo: 'Obsidian-Unifi-Vault',
        access_token: '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',
    },
    // meraki: 'https://api.meraki.com/api/v1',
    redis: {
        url: env.REDIS_URL || 'redis://127.0.0.1:6379/0',
        ttl: 3600
    }
}

export { config };