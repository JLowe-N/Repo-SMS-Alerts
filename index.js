function simpleResponse(statusCode, message) {
  let resp = {
    message: message,
    status: statusCode
  }

  return new Response(JSON.stringify(resp) {
    headers: { "Content-Type": "application/json" },
    status: statusCode
  })
}

addEventListener('fetch', event => {
  event.respondWith(githubWebhookHandler(event.request))
})

async function githubWebhookHandler(request) {
  if (request.method !== "POST") {
    return simpleResponse(
      200,
      "Please send a POST request :)"
    )
  }
  try {
    const formData = await request.json()
    const headers = await request.headers
    const action = headers.get('X-GitHub-Event')
    const repo_name = formData.repository.full_name
    const sender_name = formData.sender.login

    if (!checkSignature(formData, headers)) {
      return simpleResponse(403, "Wrong password, try again! :P")
    }

  } catch (e) {
    return simpleResponse(
      200,
      `Error: ${e}`
    )
  }
}

const crypto = require('crypto')

async function createHexSignature(requestBody) {
  let hmac = crypto.createHmac("sha1", SECRET_TOKEN)
  hmac.update(requestBody, 'utf-8')

  return hmac.digest("hex")
}

async function checkSignature(formData, headers) {
  let expectedSignature = await createHexSignature(formData)
  let actualSignature = headers.get("X-Hub-Signature")

  return expectedSignature === actualSignature
}