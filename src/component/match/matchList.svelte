<script>
	import Timer from './timer.svelte';
  import { onMount } from 'svelte';
  import { progressing } from '../../store/matching';
  import { matching } from '../../store/requestQueue';
  
	
  onMount(async () => {

    const response = await fetch('https://api.jari-bean.com/api/match/progressing', {

      method : 'GET',
      headers : {
        // for CORS 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'ACCESS_AUTHORIZATION' : localStorage.getItem('accessToken'),
      }
    });
    if (response.ok) {
      let data = await response.json();
      data = data.data
      console.log(data);

      data.forEach(element => {
      progressing.enqueue(element.id, element.userId, element.seating, element.name, element.startTime)
    });
    }
  });

  let date = new Date();
  let matchList;
  
  progressing.subscribe((obj) => {matchList = obj;});
  
 
  let value = 0

  // 완료요청
  async function completeMatching(matchingId) {
      progressing.dequeue(matchingId);
      const data = {
          'matchingId' : matchingId,
        };
      const response = await fetch('https://api.jari-bean.com/api/matching/complete', {
        method : 'PUT',
        headers : {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'ACCESS_AUTHORIZATION' : localStorage.getItem('accessToken'),
        },
        body : JSON.stringify(data)
      });
      if (response.ok) {
        const data = await response.json(); // JSON 응답을 파싱
        console.log('서버 응답:', data);
        progressing.enqueue(data.data["matchingId"], userId, Number(number), username);
      } else {
        throw new Error('매칭 요청 실패');
      }
  }
  
  onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
            value = value +10
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>
<div class="table_list card p-3">
    <h4>매칭 정보</h4>
    {#each Array.from(matchList.values()) as match }
    <div class=" card mb-3 border-0 bg-light p-1">
        <div class="row g-0">
          <div class="col-md-3">
            <div class="m-2">
                <Timer max="100" times={match.get("time")} status={match.get("status")} matchingId={match.get("matchingid")} {value} /> 
            </div>
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h5 class="card-title fw-bold" role="button">{match.get('name')} 님과의 매칭 </h5> 
              <p class="card-text text-black-50 fw-bold">
                <span>&#183;&nbsp;{match.get("number")} 인&nbsp;</span>
                <span>&#183;&nbsp;{new Date(match.get("time")).toLocaleTimeString()}&nbsp;</span>
              </p>
              <!--<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>-->
            </div>
          </div>
          <div class="col-md-2">
            <button class="complete-button" on:click={()=> completeMatching(match.get("matchingid"))}>완료</button>
          </div>
        </div>
      </div>
    {/each}
</div>

<style>
 .complete-button {
  background-color: skyblue;
  color: white;
  padding: 2rem 0.5rem;
  border: none;
  cursor: pointer;
  border-radius: 10px; 
 }

</style>