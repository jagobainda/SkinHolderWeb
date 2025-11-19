self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    if (url.pathname.startsWith("/gamerpay-proxy/")) {
        const targetUrl = "https://api.gamerpay.gg/prices";

        event.respondWith(
            fetch(targetUrl)
                .then(res => new Response(res.body, {
                    status: res.status,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }))
                .catch(() => new Response("[]", { status: 500 }))
        );
    }
});