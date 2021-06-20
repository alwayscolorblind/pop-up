export class PopUp {
    static create(properties) {
        let elem = document.querySelector("body");
        let type = "access";
        let top = 0;
        let left = 0;
        let time = 3000;

        if (properties) {
            if (properties.hasOwnProperty("element")) {
                elem = properties.element;
            }

            if (properties.hasOwnProperty("type")) {
                type = properties.type;
            }

            if (properties.hasOwnProperty("top")) {
                top = properties.top;
            }

            if (properties.hasOwnProperty("top")) {
                left = properties.left;
            }

            if (properties.hasOwnProperty("time")) {
                time = properties.time;
            }
        }

        this.#POP_UP_INIT(elem, type, top, left, time);
    }

    static #POP_UP_INIT(elem, type, top, left, time) {
        const popUp = document.createElement("div");

        popUp.classList.add("pop-up");
        popUp.classList.add(type);
        popUp.style.top = `${top}px`;
        popUp.style.left = `${left}px`;

        const circle = document.createElement("div");

        circle.classList.add("circle");

        const image = document.createElement("img");

        image.src = `assets/${type}.svg`;

        circle.append(image);

        const desc = document.createElement("p");

        desc.classList.add("desc");

        switch (type) {
            case "access":
                desc.innerHTML = "Access!";
                break;
            case "denide":
                desc.innerHTML = "Denide!";
                break;
            case "warn":
                desc.innerHTML = "Warning!";
                break;
        }

        popUp.append(circle, desc);
        elem.append(popUp);

        setTimeout(() => {
            popUp.remove();
        }, time);
    }
}
