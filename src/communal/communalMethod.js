export async function apiCall(endPoint, httpMethod, data) {

    const url = "http://13.125.35.24:8080/api"
    let accessToken;

    // you'll need to wait until the page has been mounted on the client prior to accessing localStorage
    if (typeof window !== "undefined") {
        accessToken = localStorage.getItem("accessToken");
    }

    // 요청 내용 
    const requestOptions = {
        method: httpMethod, // HTTP 메서드
        headers: {
            "Content-Type": "application/json",
            "ACCESS_AUTHORIZATION": accessToken
        },
        body: data !== null ? JSON.stringify(data) : undefined
    };

    try {
        const response = await fetch(url + endPoint, requestOptions);

        if (!response.ok) {
            throw new Error("ERROR!!")
        }

        return await response.json()
    } catch (error) {
        console.error("에러 발생:", error);
    }
}