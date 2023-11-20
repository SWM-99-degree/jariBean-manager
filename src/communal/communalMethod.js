export async function apiCall(endPoint, httpMethod, data) {

    const url = "https://api.jari-bean.com/api"
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
        console.log("[REQ] " + url + endPoint);

        const response = await fetch(url + endPoint, requestOptions);
        if (!response.ok) {
            throw new Error("ERROR!!")
        }
        return await response.json()
    } catch (error) {
        console.error("[ERROR] " + url + endPoint + " 요청에 오류가 발생하였습니다.(" + error +")");
    }
}