// src/routes/api/webhook.js
import { repository } from '../../../application/webhook/WebhookRepository';
import { json, text } from '@sveltejs/kit';
export async function GET() {
    return new Response(JSON.stringify(await repository.getWebhookList()), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
}


export async function POST({ request }) {
	const webhookObj  = await request.json();
    return new Response(JSON.stringify( await repository.saveWebhook(webhookObj)), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
}

export async function DELETE({ request }) {
	const { id } = await request.json();
    repository.deleteWebhook(id);
    return new Response("", {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
}

export async function PUT({ request }) {
	const  webhookObj  = await request.json();
    return new Response(JSON.stringify(await repository.updateWebhook(webhookObj)), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
}

