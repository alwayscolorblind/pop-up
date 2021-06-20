export class PopUp {
    static #popUpContainer;
    static #deleteContainerTimer;

    static create(properties) {
        let elem = document.querySelector("body");
        let type = "success";
        let position = "left-top";
        let time = 2000;

        if (properties) {
            if (properties.hasOwnProperty("element")) {
                elem = properties.element;
            }

            if (properties.hasOwnProperty("type")) {
                type = properties.type;
            }

            if (properties.hasOwnProperty("position")) {
                position = properties.position;
            }

            if (properties.hasOwnProperty("time")) {
                time = properties.time;
            }
        }

        this.#POP_UP_INIT(elem, type, position, time);
    }

    static #POP_UP_INIT(elem, type, position, time) {
        if (!this.#popUpContainer) {
            this.#popUpContainer = document.createElement("div");
            this.#popUpContainer.classList.add("pop-up-container");
            this.#popUpContainer.classList.add(position);
        }

        const popUp = document.createElement("div");

        popUp.classList.add("pop-up");
        popUp.classList.add(type);
        popUp.classList.add("disactive");
        setTimeout(() => {
            popUp.classList.remove("disactive");
        }, 0);

        const circle = document.createElement("div");

        circle.classList.add("circle");

        const image = document.createElement("img");

        image.src = `assets/${type}.svg`;

        circle.append(image);

        const desc = document.createElement("p");

        desc.classList.add("desc");

        switch (type) {
            case "success":
                desc.innerHTML = "Success!";
                break;
            case "denide":
                desc.innerHTML = "Denide!";
                break;
            case "warn":
                desc.innerHTML = "Warning!";
                break;
        }

        popUp.append(circle, desc);
        this.#popUpContainer.append(popUp);
        elem.append(this.#popUpContainer);

        setTimeout(() => {
            popUp.classList.add("disactive");
            setTimeout(() => {
                popUp.remove();
            }, 700)
        }, time - 700);

        if (this.#deleteContainerTimer) clearTimeout(this.#deleteContainerTimer);

        this.#deleteContainerTimer = setTimeout(() => {
            this.#popUpContainer.remove();
            this.#popUpContainer = null;
        }, time + 10);
    }
}
