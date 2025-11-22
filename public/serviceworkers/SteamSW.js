self.addEventListener("install", event => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(clients.claim());
});

self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    if (url.pathname.startsWith("/steam-proxy/")) {
        const targetUrl = url.searchParams.get("url");

        event.respondWith(
            fetch(targetUrl)
                .then(res => new Response(res.body, {
                    status: res.status,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }))
                .catch(err => {
                    console.error("Service worker fetch error:", err);
                    return new Response("{}", {
                        status: 500,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                })
        );
    }
});