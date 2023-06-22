const { read, write } = require("./helper");
const CookieStore = require("./cookie-store");

class Storage {
    constructor(target = {}, callbackFn = () => {}) {
        this.callbackFn = callbackFn;
        this.target = target;
        this.target.cookieStore = new CookieStore(this.target.cookieStore);
        return new Proxy(this.target, this);
    }

    get(target, name) {
        if (["[object Object]", "[object Array]"].includes(toString.call(target[name]))) {
            return new Proxy(target[name], this);
        }
        return target[name];
    }

    set(target, name, value) {
        const oldValue = target[name];
        if (oldValue == name) {
            return true;
        }
        Reflect.set(target, name, value);
        this.callbackFn(this.target);
        return true;
    }

    deleteProperty(target, name, value) {
        const oldValue = target[name];
        if (oldValue == undefined) {
            return true;
        }
        Reflect.deleteProperty(target, name, value);
        this.callbackFn(this.target);
        return true;
    }
}

class Store extends Storage {
    constructor(file, data = {}) {
        data = read(file, data);
        super(data, (data) => {
            write(file, data);
        });
    }
}

Storage.Store = Store;
module.exports = Store;

// var storage=new Storage({},console.log)
// storage.name='value'
// storage.user='name'
// storage.pass='word'
// // console.log(storage)

// var store=new Store('./data/store.json',{})
// store.name='value'
// store.user='name'
// store.pass='word'
// // console.log(store)
