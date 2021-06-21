export class PopUp {
    #popUpContainer = null;
    #deleteContainerTimer = null;
    static #types = new Set(["success", "denide", "warn"]);
    static #positionTypes = new Set(["left-top", "right-top", "left-bottom", "right-bottom"]);

    constructor(properties) {
        const defaultProperties = {
            elem: document.querySelector("body"),
            type: "success",
            position: "left-top",
            time: 2000
        }

        this.currentProperties = {
            ...defaultProperties, ...properties
        }


    }

    create() {
        this.#popUpInit(this.currentProperties);
    }

    #popUpInit({elem, type, position, time}) {
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
        }, time);
    }
}
