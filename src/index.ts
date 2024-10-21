import IPost from "./interfaces/Post"
import IUser from './interfaces/User';
import Comments from './interfaces/Comment';
import APIError from './interfaces/APIError';


async function fetchData<T>(url: string, retries: number = 3): Promise<T> {
    let lastError: APIError | null = null
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com${url}`,
                { signal: AbortSignal.timeout(5000) }
            )
            if (response.ok) {
                return await response.json();
            }
            lastError = new Error(`HTTP error! status: ${response.status}`) as APIError;
            lastError.status = response.status;
            lastError.statusText = response.statusText;

        } catch (err) {
            lastError = err as APIError;
        }
    }
    throw lastError || new Error('Unknown error occurred');
}

async function main() {
    try {
        const post: IPost = await fetchData<IPost>('/posts/1');
        console.log(post);
        console.log(post.title);

        const user: IUser = await fetchData<IUser>('/users/1');
        console.log(user);
        console.log(user.name);

        const comments: Comments = await fetchData<Comments>('/posts/1/comments');
        console.log(comments);
        console.log(comments.length);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
    }
}

main();

// const post = fetchData<IPost>(`/posts/1`, 5)
// post.then((postResponse: IPost) => {
//     console.log(postResponse);
//     console.log(postResponse.id)
//     console.log(postResponse.title)
//     console.log(postResponse.body)
//     console.log(postResponse.userId)

// }).catch(err => console.log(err));

// const user = fetchData<IUser>(`/users/1`, 5)
// user.then((userResponse: IUser) => {
//     console.log(userResponse);
//     console.log(userResponse.name)
//     console.log(userResponse.phone)
//     console.log(userResponse.email);
// }).catch(err => console.log(err));

// const comments = fetchData<Comments>(`/posts/1/comments`, 5)
// comments.then((commentResponse: Comments) => {
//     console.log(commentResponse);
// })