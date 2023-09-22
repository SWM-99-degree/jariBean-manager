<script>
    import { goto } from "$app/navigation";
    import { apiCall } from "../../communal/communalMethod";

    let email = "admin@email.com";
    let password = "12345678";

    async function handleLogin() {
        const response = apiCall("/manager/login", "POST", {
            email: email,
            password: password,
        });

        response
            .then((data) => {
                let accessToken = data.data.accessToken;
                let refreshToken = data.data.refreshToken;
                let cafeId = JSON.parse(atob(data.data.accessToken.split(".")[1])).userId;
                
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("cafeId", cafeId)
                goto("/management/reserve")
            })
            .catch((error) => {
                console.log("error: " + error);
            });
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
