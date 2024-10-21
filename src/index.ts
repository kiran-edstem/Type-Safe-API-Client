import IPost from "./interfaces/Post"
import IUser from './interfaces/User';
import Comments from './interfaces/Comment';

async function fetchData<T>(url: string, retry: number): Promise<T | never> {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com${url}`,
            { signal: AbortSignal.timeout(5000) }
        )
        if ((response.status) === 200) {
            const data = await response.json();
            return data
        }
        if (retry > 0) {
            return fetchData(url, retry - 1)
        } else {
            throw new Error(`Too many retries`)
        }

    } catch (err) {
        console.log(err);
        throw new Error('Something went wrong')
    }
}

const post = fetchData<IPost>(`/posts/1`, 5)
post.then((postResponse: IPost) => {
    console.log(postResponse);
    console.log(postResponse.id)
    console.log(postResponse.title)
    console.log(postResponse.body)
    console.log(postResponse.userId)

}).catch(err => console.log(err));

const user = fetchData<IUser>(`/users/1`, 5)
user.then((userResponse: IUser) => {
    // console.log(userResponse);
    // console.log(userResponse.name)
    // console.log(userResponse.phone)
    // console.log(userResponse.email);
}).catch(err => console.log(err));

const comments = fetchData<Comments>(`/posts/1/comments`, 5)
comments.then((commentResponse: Comments) => {
    console.log(commentResponse);
    // console.log(commentResponse[0].body)
    // console.log(commentResponse[0].email)
    // console.log(commentResponse[0].postId)
    // console.log(commentResponse[0].name)
})