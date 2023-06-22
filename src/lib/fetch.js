const Request = require("./request");
const Response = require("./response");
const Registry = require("./registry");
const Storage = require("./storage");

function fetch(resource, options = {}) {
    return new Promise(async (resolve, reject) => {
        const request = new Request(resource, options);

        if(!options.storage){
            options.storage=new Storage('./data/'+request.hostname+'.json.gz')
        }

        const cookie=options.storage.cookieStore.cookie
        if(cookie&&request.credentials=='include'){
            request.headers.set('Cookie', cookie)
        }

        const proxyServer = Registry.getProxyServer();
        if (proxyServer) {
            const proxyRequest = new Request(proxyServer[0], {
                method: "CONNECT",
                path: request.hostname + ":" + request.port,
            });

            if (request.protocol == "https:") {
                request.agent = await new Promise((resolve) => {
                    const proxyReq = proxyRequest.client.request(proxyRequest);
                    proxyReq.on("error", reject);

                    proxyReq.on("connect", (res, socket, head) => {
                        const agent = new request.client.Agent({
                            socket,
                            keepAlive: true,
                            rejectUnauthorized: false,
                        });
                        resolve(agent);
                    });
                    proxyRequest.body.pipe(proxyReq);
                });
            } else {
                request.hostname = proxyRequest.hostname;
                request.port = proxyRequest.port;
            }
        }

        const req = request.client.request(request);
        req.on("error", reject);
        req.on("response", (res) => {
            let response = new Response(res, {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                headers: res.headers,
                url: request.url,
            });

            const setCookie = response.headers.getSetCookie()
            if(setCookie.length){
                options.storage.cookieStore.cookie=setCookie
            }

            const redirect=request.redirect=='follow'&&
            request.follow>0&&
            response.headers.has('Location')
            if(redirect){
                --request.follow
                const location = response.headers.get('Location')
                resource=new URL(location,request.origin).toString()
                const {client,path,agent,body,headers,...redirectOptions} = request
                response=fetch(resource, redirectOptions)
            }

            resolve(response);
        });
        request.body.pipe(req);
    });
}

module.exports = fetch;

// fetch("http://google.com")
//     .then((response) => response.text())
//     .then((text) => console.log(text));

// fetch("https://jsonplaceholder.typicode.com/posts/1")
//     .then((response) => response.json())
//     .then((json) => console.log(json));

// fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((response) => response.json())
//     .then((json) => console.log(json));

// fetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     body: JSON.stringify({
//         title: "foo",
//         body: "bar",
//         userId: 1,
//     }),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8",
//     },
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));

// fetch("https://jsonplaceholder.typicode.com/posts/1", {
//     method: "PUT",
//     body: JSON.stringify({
//         id: 1,
//         title: "foo",
//         body: "bar",
//         userId: 1,
//     }),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8",
//     },
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));

// fetch("https://jsonplaceholder.typicode.com/posts/1", {
//     method: "PATCH",
//     body: JSON.stringify({
//         title: "foo",
//     }),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8",
//     },
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));

// fetch("https://jsonplaceholder.typicode.com/posts/1", {
//     method: "DELETE",
// });

// fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
//     .then((response) => response.json())
//     .then((json) => console.log(json));

// fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
//     .then((response) => response.json())
//     .then((json) => console.log(json));
