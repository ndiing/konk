class Headers {
    constructor(init) {
        if (init) {
            for (let name in init) {
                name = this.key(name);
                const value = init[name];
                this.set(name, value);
            }
        }
    }

    append(name, value) {
        name = this.key(name);
        if (this[name]) {
            if (Array.isArray(this[name])) {
                this[name].push(value);
            } else {
                this[name] = [this[name], value];
            }
        } else {
            this[name] = value;
        }
    }

    delete(name) {
        name = this.key(name);
        delete this[name];
    }

    *entries() {
        for (let name of Object.getOwnPropertyNames(this)) {
            name = this.key(name);
            yield [name, this[name]];
        }
    }

    forEach(callbackFn) {
        for (let name of Object.getOwnPropertyNames(this)) {
            name = this.key(name);
            callbackFn(this[name], name, this);
        }
    }

    get(name) {
        name = this.key(name);
        return this[name];
    }

    getSetCookie() {
        let name = "Set-Cookie";
        name = this.key(name);
        return (Array.isArray(this[name]) ? this[name] : [this[name]]).filter(Boolean);
    }

    has(name) {
        name = this.key(name);
        return !!this[name];
    }

    key(name) {
        return Object.getOwnPropertyNames(this).find((key) => new RegExp(`^${key}$`, "i").test(name)) || name;
    }

    *keys() {
        for (let name of Object.getOwnPropertyNames(this)) {
            name = this.key(name);
            yield name;
        }
    }

    set(name, value) {
        name = this.key(name);
        this[name] = value;
    }

    *values() {
        for (let name of Object.getOwnPropertyNames(this)) {
            name = this.key(name);
            yield this[name];
        }
    }
}

module.exports = Headers;

// var headers = new Headers();
// headers.append('Set-Cookie','name=value')
// headers.append('Set-Cookie','name1=value1')
// headers.append('Set-Cookie','name12=value12')
// headers.append('Set-Cookie','name123=value123')
// headers.append('Accept','application/json')
// headers.append('Content-Type','application/json')
// headers.delete('Accept')
// console.log(Array.from(headers.entries()))
// headers.forEach(console.log)
// console.log(headers.get('Content-Type'))
// console.log(headers.get('Content-type'))
// console.log(headers.get('content-Type'))
// console.log(headers.getSetCookie())
// console.log(headers.has('Content-Type'))
// console.log(headers.key('Content-Type'))
// console.log(Array.from(headers.keys()))
// headers.set('Connection','keep-alive')
// console.log(Array.from(headers.values()))
// console.log(headers)