class Cookie {
    constructor(name, value) {
        let domain, expires, httpOnly, maxAge, partitioned, path, secure, sameSite;
        if (typeof name == "object") {
            ({ name, value, domain, expires, httpOnly, maxAge, partitioned, path, secure, sameSite } = name);
        }
        if (name !== undefined) this.name = name;
        if (value !== undefined) this.value = value;
        if (domain !== undefined) this.domain = domain;
        if (expires !== undefined) this.expires = expires;
        if (httpOnly !== undefined) this.httpOnly = httpOnly;
        if (maxAge !== undefined) this.maxAge = maxAge;
        if (partitioned !== undefined) this.partitioned = partitioned;
        if (path !== undefined) this.path = path;
        if (secure !== undefined) this.secure = secure;
        if (sameSite !== undefined) this.sameSite = sameSite;
    }
}

const CookieAttributes = {
    domain: "Domain",
    expires: "Expires",
    httpOnly: "HttpOnly",
    maxAge: "Max-Age",
    partitioned: "Partitioned",
    path: "Path",
    secure: "Secure",
    sameSite: "SameSite",
};

class CookieStore {
    constructor(init) {
        if (init) {
            for (const name in init) {
                const cookie = init[name];
                this.set(cookie);
            }
        }
    }

    get cookie() {
        return Object.getOwnPropertyNames(this)
            .map((name) => [name, this[name]?.value ?? ""].join("="))
            .join("; ");
    }

    set cookie(value) {
        if (!Array.isArray(value)) {
            value = [value];
        }

        if (value.length == 0) {
            return;
        }

        for (const string of value) {
            const cookie = {};
            for (const [, name, , value] of string.matchAll(/([^=; ]+)(=([^=;]+)?)?/g)) {
                if (/\bDomain\b/i.test(name)) cookie.domain = value;
                else if (/\bExpires\b/i.test(name)) cookie.expires = Date.parse(value);
                else if (/\bHttpOnly\b/i.test(name)) cookie.httpOnly = true;
                else if (/\bMax-Age\b/i.test(name)) cookie.maxAge = parseInt(value);
                else if (/\bPartitioned\b/i.test(name)) cookie.partitioned = true;
                else if (/\bPath\b/i.test(name)) cookie.path = value;
                else if (/\bSecure\b/i.test(name)) cookie.secure = true;
                else if (/\bSameSite\b/i.test(name)) cookie.sameSite = value;
                else {
                    cookie.name = name;
                    cookie.value = value;
                }
            }
            if (cookie.value) {
                // console.log(cookie);
                this.set(cookie);
            } else {
                this.delete(cookie);
            }
        }
    }

    delete(name) {
        const cookie = new Cookie(name);
        delete this[cookie.name];
    }

    get(name) {
        const cookie = new Cookie(name);
        return this[cookie.name];
    }

    getAll() {}

    set(name, value) {
        const cookie = new Cookie(name, value);
        this[cookie.name] = cookie;
    }

    static serialize(name, value) {
        const cookie = new Cookie(name, value);
        let attributes;
        ({ name, value, ...attributes } = cookie);
        const serializedAttributes = Object.entries(attributes).map(([attr, attrValue]) => {
            const serializedAttr = CookieAttributes[attr];
            if (typeof attrValue === "boolean" || typeof attrValue === "undefined") {
                return serializedAttr;
            } else {
                return `${serializedAttr}=${attrValue}`;
            }
        });
        return [`${name}=${value}`, ...serializedAttributes].join("; ");
    }
}

module.exports = CookieStore;

// const cookie = {
//     name: "__Host-example",
//     value: "34d8g",
//     sameSite: "None",
//     secure: true,
//     path: "/",
//     partitioned: true,
// };

// console.log(CookieStore.serialize(cookie));

// var cookieStore = new CookieStore();
// cookieStore.set("name", "value");
// cookieStore.set("name1", "value1");
// cookieStore.set("name12", "value12");
// cookieStore.set("name123", "value123");
// // console.log(cookieStore);

// cookieStore.cookie = "";
// cookieStore.cookie = [];
// cookieStore.cookie = ["sessionId=38afes7a8", "id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT", "id=a3fWa; Max-Age=2592000", "qwerty=219ffwef9w0f; Domain=somecompany.co.uk", "sessionId=e8bb43229de9; Domain=foo.example.com", "__Secure-ID=123; Secure; Domain=example.com", "__Host-ID=123; Secure; Path=/", "__Secure-id=1", "__Host-id=1; Secure", "__Host-id=1; Secure; Path=/; Domain=example.com", "__Host-example=34d8g; SameSite=None; Secure; Path=/; Partitioned;"];
// cookieStore.cookie = "sessionId=38afes7a8";
// cookieStore.cookie = "id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT";
// cookieStore.cookie = "id=a3fWa; Max-Age=2592000";
// cookieStore.cookie = "qwerty=219ffwef9w0f; Domain=somecompany.co.uk";
// cookieStore.cookie = "sessionId=e8bb43229de9; Domain=foo.example.com";
// cookieStore.cookie = "__Secure-ID=123; Secure; Domain=example.com";
// cookieStore.cookie = "__Host-ID=123; Secure; Path=/";
// cookieStore.cookie = "__Secure-id=1";
// cookieStore.cookie = "__Host-id=1; Secure";
// cookieStore.cookie = "__Host-id=1; Secure; Path=/; Domain=example.com";
// cookieStore.cookie = "__Host-example=34d8g; SameSite=None; Secure; Path=/; Partitioned;";
// // console.log(cookieStore.cookie);

// // console.log(cookieStore);
