const newFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the form
    const title = document.querySelector('[name="post-title"]').value;
    const post_text = document.querySelector('[name="post-text"]').value;