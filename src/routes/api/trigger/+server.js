import { repository } from "../../../application/webhook/webhook-repository";
import { callWekhook } from "../../../application/worker/worker";

export async function POST({ request }) {
  let { id, params = {} } = await request.json();
  let webhookObj = await repository.getById(id);
  let realUrlList = [];
  if (webhookObj?.urlList?.length > 0) {
    webhookObj.urlList.forEach((url) => {
      let realUrl = url.replace(/\{([^}]+)\}/g, (match, p1) => params[p1] || "");
      realUrlList.push(realUrl);
      callWekhook(realUrl);
    });
  }

  return new Response(JSON.stringify(realUrlList), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
