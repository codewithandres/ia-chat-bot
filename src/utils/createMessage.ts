// create message element with dynamic classes and return it
export const createMessageElement = (
    content: string,
    ...className: string[]
) => {
    const div: HTMLElement = document.createElement('div');
    div.classList.add('message', ...className);
    div.innerHTML = content;
    console.log(className);

    return {
        div,
    };
};
