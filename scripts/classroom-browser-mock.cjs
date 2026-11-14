module.exports = async function mockClassroom(page, requests = []) {
  let active = false;
  await page.route('**/api/**', async route => {
    const path = new URL(route.request().url()).pathname;
    const state = { active: true, remaining: 500, expiresAt: Date.now() + 3600000 };
    let status = 200;
    let result = state;
    if (path.endsWith('/redeem')) { active = true; result = { ...state, token: 'test-session-not-an-api-key' }; }
    else if (path === '/api/logout') { active = false; result = { ok: true }; }
    else if (!active) { status = 401; result = { message: '请输入课堂口令。' }; }
    else if (path === '/api/chat') {
      requests.push(route.request().postDataJSON());
      return route.fulfill({ status: 200, contentType: 'text/event-stream', headers: { 'Access-Control-Allow-Origin': '*' }, body: 'data: {"choices":[{"delta":{"content":"先观察循环变量。"}}]}\n\ndata: [DONE]\n\n' });
    }
    return route.fulfill({ status, json: result, headers: { 'Access-Control-Allow-Origin': '*' } });
  });
};
