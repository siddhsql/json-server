class Path {
    #path;
    #parts;

    constructor(path) {
        if (!path.startsWith('/')) {
            throw new Error(`invalid path ${path}`);
        }
        this.#path = path;
        if (path === "/") {
            this.#parts = [];
        } else {
            this.#parts = path.split('/').slice(1);  // discard first element.
        }
    }

    toString = () => {
        return this.#path;
    }

    isRoot = () => {
        return this.#path === "/";
    }

    /**
     * get element at depth i. remember i = 0 means root.
     * @param {*} i . i ranges from 0 to depth.
     * @returns 
     */
    get = (i) => {
        if (i === 0) { 
            return "/";
        } else {
            return this.#parts[i - 1];
        }
    }

    breadcrumbs = () => {
        return this.#parts.slice(); // return a clone and keep the original to yourself
    }

    /**
     * 
     * @returns e.g. depth("/a/b/c/d") = 4, depth("/") = 0.
     */
    depth = () => {
        if (this.isRoot()) {
            return 0;
        } else {
            return this.#parts.length;
        }
    }

    /**
     * 
     * @param {*} depth . depth = 1 will keep 1 element from the path. depth >= 0.
     * @returns 
     */
    truncate = (depth) => {
        if (depth < 0) {
            throw new Error("depth must be greater than or equal to 0.");
        }
        if (depth === 0) { return new Path('/') } // special case  
        const n = this.depth();
        if (depth >= n) {
            return new Path(this.#path);
        }
        return new Path(this.#path.split('/').slice(0, depth + 1).join('/'));
    }
}

module.exports = {
    Path: Path
}