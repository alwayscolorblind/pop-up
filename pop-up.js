export class PopUp {
    static #popUpContainer;
    static #deleteContainerTimer;
    static #types = new Set(["success", "denide", "warn"]);
    static #positionTypes = new Set(["left-top", "right-top", "left-bottom", "right-bottom"]);

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
                if (this.#types.has(properties.type)) type = properties.type;
            }

            if (properties.hasOwnProperty("position")) {
                if (this.#positionTypes.has(properties.position)) position = properties.position;
            }

            if (properties.hasOwnProperty("time")) {
                if (time > 0) time = properties.time;
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

        popUp.prepend(circle, desc);
        this.#popUpContainer.append(popUp);
        try  {
            elem.append(this.#popUpContainer);
        } catch (e) {
            console.error(new Error(`${elem} is not node element`));
        }

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
