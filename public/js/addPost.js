const newFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the form
    const title = document.querySelector('[name="post-title"]').value;
    const post_text = document.querySelector('[name="post-text"]').value;

    if (title && post_text) {
        const response = await fetch(`/api/posts`, {
            method: "POST",
            body: JSON.stringify({
                title,
                post_text,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            // If successful, redirects browser to dashboard page
            document.location.replace("/dashboard/");
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector(".new-post-form")
    .addEventListener("submit", newFormHandler);

