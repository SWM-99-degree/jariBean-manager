<script>
    import { onMount } from "svelte";

    import { goto } from "$app/navigation";

    onMount(() => {
        // localStroage에 "accessToken" 조회
        let accessToken = localStorage.getItem("accessToken")
        
        // "accessToken"이 존재할 경우
        if (accessToken) {
            goto("/management/reserve")
        }

        // "accessToken"이 존재하지 않을 경우
        if (!accessToken) {
            goto("/login")
        }
    })    
</script>