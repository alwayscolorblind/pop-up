export class PopUp {
    #popUpContainer = null;
    #types = ["success", "denide", "warn"];
    #defaultPopupConfig = {
        type: "success"
    }
    #positionTypes = ["left-top", "right-top", "left-bottom", "right-bottom"];

    constructor(properties) {
        const defaultProperties = {
            elem: document.querySelector("body"),
            position: "left-top",
            defaultTime: 2000
        }

        this.currentProperties = {
            ...defaultProperties, ...properties
        }

        if (this.#positionTypes.indexOf(this.currentProperties.position) === -1) {
            throw new Error(`Unknown position: ${this.currentProperties.position}`);
        }

        this.#defaultPopupConfig.time = this.currentProperties.defaultTime;

        this.#initContainer(this.currentProperties);
    }

    #initContainer({elem, position}) {
        this.#popUpContainer = document.createElement("div");

        this.#popUpContainer.classList.add("pop-up-container");
        this.#popUpContainer.classList.add(position);

        elem.append(this.#popUpContainer);
    }

    create({ type = "success", time = this.currentProperties.defaultTime} = this.#defaultPopupConfig) {
        if (this.#types.indexOf(type) !== -1){
            this.#popUpCreate(this.#popUpContainer, type, time);
        } else {
            throw new Error(`Unknown type: ${type}`);
        }
    }

    #popUpCreate(container, type, time) {
        const popUp = document.createElement("div");
        popUp.classList.add("pop-up");
        popUp.classList.add(type);
        popUp.classList.add("disactive");
        setTimeout(() => {
            popUp.classList.remove("disactive");
        }, 0);

        const circle = document.createElement("div");

        circle.classList.add("circle");

        const image = document.createElement("div");

        image.classList.add("image");

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
        container.append(popUp);

        setTimeout(() => {
            popUp.classList.add("disactive");
            setTimeout(() => {
                popUp.remove();
            }, 700)
        }, time - 700);
    }
}
