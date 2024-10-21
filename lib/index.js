"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchData(url, retry) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com${url}`, { signal: AbortSignal.timeout(5000) });
        if ((response.status) === 200) {
            const data = await response.json();
            return data;
        }
        if (retry > 0) {
            return fetchData(url, retry - 1);
        }
        else {
            throw new Error(`Too many retries`);
        }
    }
    catch (err) {
        console.log(err);
        throw new Error('Something went wrong');
    }
}
const post = fetchData(`/posts/1`, 5);
post.then((postResponse) => {
    console.log(postResponse);
    console.log(postResponse.id);
    console.log(postResponse.title);
    console.log(postResponse.body);
    console.log(postResponse.userId);
}).catch(err => console.log(err));
const user = fetchData(`/users/1`, 5);
user.then((userResponse) => {
    console.log(userResponse);
    console.log(userResponse.name);
    console.log(userResponse.phone);
    console.log(userResponse.email);
}).catch(err => console.log(err));
const comments = fetchData(`/posts/1/comments`, 5);
comments.then((commentResponse) => {
    console.log(commentResponse);
});
