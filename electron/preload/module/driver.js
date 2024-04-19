
// 用来挂载渲染进程
export class Driver {
    static mDriver = {};

    static use(name, cls) {
        if (this.has(name)) {
            console.log(`${name} is exists!!!`);
        } else {
            this.mDriver[name] = cls;
        }
    }

    static create(name, handler) {
        if (this.mDriver[name]) {
            return new this.mDriver[name](handler);
        }

        return null;
    }

    static export(handler) {
        const ctx = {};
        for (let key in this.mDriver) {
            const cls = new this.mDriver[key](handler);
            if (typeof cls.export == "function") {
                ctx[key] = cls.export();
            }
        }
        return ctx;
    }

    static has(name) {
        return this.mDriver[name] != null;
    }
}