
const editFormHandler = async (event) => {
    event.preventDefault();

    // Collect values form the form
    const title = document.querySelector('[name="post-title"]').value;
    const post_text = document.querySelector('[name="post-text"]').value;
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
};    