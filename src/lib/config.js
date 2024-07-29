import { env } from '$env/dynamic/private';

const config = {
    mongoUrl: env.MONGO_PUBLIC_URL || 'mongodb://127.0.0.1:27017/Sapiens',
    git: {
        owner: 'Falesteo',
        repo: 'Obsidian-Unifi-Vault',
        access_token: env.GITHUB_TOKEN,
    },
    redis: {
        url: env.REDIS_PUBLIC_URL || 'redis://127.0.0.1:6379/0',
        ttl: 3600
    }
}

export { config };