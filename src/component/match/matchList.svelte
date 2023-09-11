<script>
	import Timer from './timer.svelte';
  import { onMount } from 'svelte';
  import { progressing } from '../../store/matching';
  import { matching } from '../../store/requestQueue';
  
	
  let date = new Date();
  let date2 = new Date();

    // {
    //         title : "스터디용 2",
    //         name : "김xx",
    //         person : 2,
    //         reservTime : '10:30~12:30',
    //         matchTime : date.setMinutes(date.getMinutes() + 5)
    //     },
    //     {
    //         title : "회의용 1",
    //         name : "박xx",
    //         person : 3,
    //         reservTime : '10:30~12:30',
    //         matchTime : date2.setSeconds(date.getSeconds() + 10)
    // }
  let matchList;
  
  progressing.subscribe((obj) => {matchList = obj;});
  
 
  let value = 0
  
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
                <Timer max="100" times={match.get("time")} status={match.get("status")} {value} />   
            </div>
    
          </div>
          <div class="col-md-9 ">
            <div class="card-body">
              <h5 class="card-title fw-bold" role="button">{match.get('userid')} 님과의 매칭</h5>
              <p class="card-text text-black-50 fw-bold">
                <span>&#183;&nbsp;{match.get("number")} 인&nbsp;</span>
                <span>&#183;&nbsp;{new Date(match.get("time")).toLocaleTimeString()}&nbsp;</span>
              </p>
              <!--<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>-->
            </div>
          </div>
        </div>
      </div>
    {/each}
</div>