export class PopUp {
    #popUpContainer = null;
    #currentProperties = null;
    #types = ["success", "denide", "warn"];
    #positionTypes = ["left-top", "right-top", "left-bottom", "right-bottom"];
    #defaultPopupConfig = {
        type: "success"
    }

    constructor(properties) {
        const defaultProperties = {
            elem: document.querySelector("body"),
            position: "left-top",
            defaultTime: 2000
        }

        this.#currentProperties = {
            ...defaultProperties, ...properties
        }

        if (this.#positionTypes.indexOf(this.#currentProperties.position) === -1) {
            throw new Error(`Unknown position: ${this.#currentProperties.position}`);
        }

        this.#defaultPopupConfig.time = this.#currentProperties.defaultTime;

        this.#initContainer(this.#currentProperties);
    }

    #initContainer({elem, position}) {
        this.#popUpContainer = document.createElement("div");

        this.#popUpContainer.classList.add("pop-up-container");
        this.#popUpContainer.classList.add(position);

        elem.append(this.#popUpContainer);
    }

    show({type = "success", time = this.#currentProperties.defaultTime} = this.#defaultPopupConfig) {
        let popUp = null;

        if (this.#types.indexOf(type) === -1) throw new Error(`Unknown type: ${type}`);

        popUp = this.#createPopUp(type);

        this.#addRemovingTimeout(popUp, time);

        this.#showPopUp(this.#popUpContainer, popUp);
    }

    #createPopUp(type) {
        const popUp = document.createElement("div");

        this.#initPopUpClasses(popUp, type);

        const circleWithImage = this.#createCircleWithImage();

        const description = this.#createDescription(type);

        popUp.prepend(circleWithImage, description);

        return popUp;
    }

    #initPopUpClasses(popUp, type) {
        popUp.classList.add("pop-up");
        popUp.classList.add(type);
        popUp.classList.add("transition"); // Added class "transition" to move popUp from client's view
        setTimeout(() => {
            popUp.classList.remove("transition");
        }, 0); // Remove class to start animation
    }

    #createCircleWithImage() {
        const circle = document.createElement("div");

        circle.classList.add("circle");

        const image = document.createElement("div");

        image.classList.add("image");

        circle.append(image);

        return circle;
    }

    #createDescription(type) {
        const description = document.createElement("p");

        description.classList.add("desc");

        switch (type) {
            case "success":
                description.innerHTML = "Success!";
                break;
            case "denide":
                description.innerHTML = "Denide!";
                break;
            case "warn":
                description.innerHTML = "Warning!";
                break;
        }

        return description;
    }

    #showPopUp(container, popUp) {
        if (this.#currentProperties.position.endsWith("top")) {
            container.prepend(popUp);
        } else {
            container.append(popUp);
        }
    }

    #addRemovingTimeout(popUp, time) {
        setTimeout(() => {
            popUp.classList.add("transition"); // Enable animation before deleting
            setTimeout(() => {
                popUp.remove();
            }, 700)
        }, time - 700);
    }
}

