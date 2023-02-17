import { handleSession } from 'svelte-kit-cookie-session';

// You can do it like this, without passing a own handle function
export const handle = handleSession({
    // Optional initial state of the session, default is an empty object {}
    // init: (event) => ({
    // 	views: 0
    // }),
    secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNAZy5jIiwiaWF0IjoxNjc2NjQwOTkxLCJleHAiOjE2NzY2NDQ1OTF9.kNYNrHrVYFnDP3s9b9nSmLCGSv0laTc4N83-aNQL6Co'
});

// Or pass your handle function as second argument to handleSession