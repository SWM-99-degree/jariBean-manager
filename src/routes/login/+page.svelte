<script>
    import { goto } from "$app/navigation";
    import { apiCall } from "../../communal/communalMethod";
    import { cafe } from "../../store/cafe";

    let email = "admin@email.com";
    let password = "12345678";

    async function handleLogin() {
        const loginRsponse = apiCall("/manager/login", "POST", {
            email: email,
            password: password,
        });

        console.log(loginRsponse);

        var data = await loginRsponse;

        console.log(data);

        let accessToken = data.data.accessToken;
        let refreshToken = data.data.refreshToken;
        let cafeId = JSON.parse(
            atob(data.data.accessToken.split(".")[1])
        ).userId;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("cafeId", cafeId);
        
        const cafeRespose = apiCall("/cafe/" + cafeId, "GET", null);
        
        data = await cafeRespose;
        $cafe = data.data

        console.log(data);
        


        goto("/management/reserve");



        // response
        //     .then((data) => {
        //         console.log(data);
        //         let accessToken = data.data.accessToken;
        //         let refreshToken = data.data.refreshToken;
        //         let cafeId = JSON.parse(atob(data.data.accessToken.split(".")[1])).userId;

        //         localStorage.setItem("accessToken", accessToken);
        //         localStorage.setItem("refreshToken", refreshToken);
        //         localStorage.setItem("cafeId", cafeId)
        //         goto("/management/reserve")
        //     })
        //     .catch((error) => {
        //         console.log("error: " + error);
        //     });
    }
</script>

<h1>로그인</h1>
<label for="email">이메일:</label>
<input type="email" id="email" bind:value={email} required />

<label for="password">비밀번호:</label>
<input type="password" id="password" bind:value={password} required />

<button on:click={handleLogin}>로그인</button>

<style>
    :global(.touched:invalid) {
        border-color: red;
        outline-color: red;
    }
</style>
