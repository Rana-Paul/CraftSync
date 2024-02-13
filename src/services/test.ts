export const test = () => {
    return fetch("/api/test").then((res) => res.json())
}