const postsContainer = document.getElementById("posts");
const template = document.getElementById("postTemplate");

// তোমার যতগুলো পোস্ট দরকার এখানে শুধু সংখ্যাটা বসিয়ে দাও (যেমন: 5, 10, 20)
const postCount = 8;

// ১. API থেকে নির্দিষ্ট সংখ্যক পোস্ট আনা
fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${postCount}`)
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            // HTML টেমপ্লেটের একটা কপি বানাচ্ছি
            const postClone = template.content.cloneNode(true);

            // টেমপ্লেটের ভেতরের এলিমেন্টগুলোতে ডাটা বসাচ্ছি
            postClone.querySelector(".post-title").textContent = `${post.id}. ${post.title}`;
            postClone.querySelector(".post-body").textContent = post.body;

            const btn = postClone.querySelector(".see-btn");
            const commentsBox = postClone.querySelector(".comments-area");

            // বাটনে ক্লিক করলে কমেন্ট লোড ও টগল হবে
            btn.addEventListener("click", () => {
                toggleComments(post.id, commentsBox, btn);
            });

            // স্ক্রিনের মেইন কন্টেইনারে পোস্ট যোগ করা
            postsContainer.appendChild(postClone);
        });
    });

// ২. কমেন্ট লোড করার ফাংশন
function toggleComments(postId, container, button) {
    // আগে থেকে খোলা থাকলে হাইড/মুছে ফেলবে
    if (container.innerHTML !== "") {
        container.innerHTML = "";
        button.textContent = "See Comments";
        return;
    }

    button.textContent = "Loading...";

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            button.textContent = "Hide Comments";

            comments.forEach(comment => {
                const p = document.createElement("p");
                p.className = "comment";
                p.innerHTML = `<strong>${comment.email}:</strong> ${comment.body}`;
                container.appendChild(p);
            });
        });
}