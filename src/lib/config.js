import { env } from '$env/dynamic/private';

const config = {
    mongoUrl: env.MONGO_URL || 'mongodb://127.0.0.1:27017/Sapiens',
    git: {
        owner: 'Falesteo',
        repo: 'Obsidian-Unifi-Vault',
        access_token: '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',
    },
    redis: {
        url: env.REDIS_URL || 'redis://127.0.0.1:6379/0',
        ttl: 3600
    }
}

export { config };