<script>
    import { goto } from "$app/navigation";
    import cafe from "../../store/cafe"

    let email = 'admin@email.com';
    let password = '12345678';


    async function handleLogin() {
        try {
            const response = fetch('http://13.125.35.24:8080/api/manager/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if ((await response).ok) {
                // 로그인 성공 처리
                const data = (await response).json();
                console.log(data.then((data) => {
                    try{
                        // localStorage에 JWT 저장
                        localStorage.setItem("accessToken", data.data.accessToken)
                        localStorage.setItem("refeshToken", data.data.refeshToken)

                        let payload = atob(data.data.accessToken.split(".")[1]);

                        let cafeId = JSON.parse(payload).userId;   
                        console.log("cafeId: " + cafeId);
                        getCafeInfo(cafeId)     
                        
                    } catch(error) {
                        console.log(error);
                    }
                }));
                goto("/management/reserve")
            } else {
                // 로그인 실패 처리
                console.error('로그인 실패:', (await response).status);
            }
        } catch (error) {
            console.error('에러 발생:', error);
        }
  }
  async function getCafeInfo(cafeId){
    console.log("getCafeInfo");
    let accessToken = localStorage.getItem("accessToken")
    fetch('http://13.125.35.24:8080/api/cafe/'+cafeId+"/summary", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ACCESS_AUTHORIZATION': accessToken
        }
    }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // JSON 응답을 파싱합니다.
    })
    .then(data => {
        console.log('서버로부터 받은 데이터:', data);
        // 여기에서 데이터를 처리하거나 상태를 업데이트하세요.
        console.log(data.data);
        cafe.set(data.data)

        let cafeInfo;
        cafe.subscribe((obj) => {
            cafeInfo = obj;
        })

        console.log("data.data.name : " + cafeInfo.name);
    })
    .catch(error => {
        console.error('네트워크 요청 오류:', error);
    });
  } 
  console.log("hello");
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
