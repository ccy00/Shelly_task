import Webhook from './webhook'

interface WebhookRepository {
    getWebhookList: () => Promise<Webhook[]>;
    saveWebhook: (webhook: Webhook) => Promise<boolean>;
    deleteWebhook: (webhookId: string) => Promise<boolean>;
    updateWebhook: (webhook: Webhook) => Promise<boolean>;
    getById: (webhookId: string) => Promise<Webhook>;
}

class WebhookRepositoryImpl implements WebhookRepository {
    private webhookList: Webhook[] = [
        new Webhook('test webhook 1', '1', true, ['www.taobao.com?token={token}', 'www.jd.com?token={token}']),
        new Webhook('test webhook 2', '2', true, ['www.pingduoduo.com?token={token}']),
    ];

    async getWebhookList(): Promise<Webhook[]> {
        return new Promise(resolve => {
            resolve(this.webhookList);
        });
    }

    async saveWebhook(webhook: Webhook): Promise<boolean> {
        return new Promise(resolve => {
            webhook.id =new Date().getTime()+'';
            this.webhookList.push(webhook);
            resolve(true);
        });
    }

    async deleteWebhook(webhookId: string): Promise<boolean> {
        return new Promise(resolve => {
            this.webhookList = this.webhookList.filter(w => w.id !== webhookId);
            resolve(true);
        });
    }

    async updateWebhook(webhook: Webhook): Promise<boolean> {
        return new Promise(resolve => {
            this.webhookList = this.webhookList.map(w => w.id === webhook.id ? webhook : w);
            resolve(true);
        });
    }

    async getById(webhookId: string): Promise<Webhook> {
        return new Promise(resolve => {
            resolve(this.webhookList.find(w => w.id === webhookId) || {} as Webhook);
        });
    }
}

export const repository: WebhookRepository = new WebhookRepositoryImpl();