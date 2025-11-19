self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    if (url.pathname.startsWith("/steam-proxy/")) {
        const targetUrl = url.searchParams.get("url");

        event.respondWith(
            fetch(targetUrl)
                .then(res => new Response(res.body, {
                    status: res.status,
                    headers: {
                        "Content-Type": "text/plain",
                        "Access-Control-Allow-Origin": "*"
                    }
                }))
                .catch(() => new Response("{}", { status: 500 }))
        );
    }
});
