<script>
// @ts-nocheck
    import { onMount } from 'svelte';
    import { progressing } from '../../store/matching';
    let value = 0;
    export let max = 100;
    export let times;
    export let status;
    export let matchingId;
    
    let date = new Date();
    let maxTime =  date - new Date().setMinutes(date.getMinutes() + 10);
    
  
    $: progressPath = () => {
      if (value <= 0) {
        return "";
      } else if (value >= max) {
        return "M50,5A45 45 0 1 1 49.9999 5";
      } else {
        const angle = Math.PI * 2 * (value / max);
        const x = 50 + Math.cos(angle - Math.PI / 2) * 45;
        const y = 50 + Math.sin(angle - Math.PI / 2) * 45;
  
        let path = "M50,5";
  
        if (angle > Math.PI) {
          path += "A45 45 0 0 1 50 95";
        }
  
        path += `A45 45 0 0 1 ${x} ${y}`;
  
        return path;
      }
    };
   // @ts-ignore
    $: diff = times - date;
    $: diffMin = Math.floor((diff/1000)/60);
    $: diffSec = Math.floor(diff/1000);
    $: value = Math.round( (diff/maxTime) * -100 )
    $: progressColor = value < 35 ?  '#EF476F' : value > 75 ?   '#06D6A0' :'#FFD166';
    $: console.log(value)
    
    onMount(() => {
      const interval = setInterval(() => {
        date = new Date();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    });
    console.log(status);

    async function noShowMatching(matchingId) {
      console.log(matchingId);
      progressing.dequeue(matchingId);
      const data = {
          'matchingId' : matchingId,
      };
      const response = await fetch('https://api.jari-bean.com/api/matching/noshow', {
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
        // progressing.enqueue(data.data["matchingId"], userId, Number(number), username);
      } else {
        throw new Error('매칭 요청 실패');
      }
  }
  </script>
  
  <style>
    svg {
      fill: var(--progress-fill, transparent);
      height: 100%;
      position: absolute;
      stroke-linecap: var(--progress-linecap, round);
      width: 100%;
    }
    path:first-child {
      stroke: var(--progress-trackcolor, grey);
      stroke-width: var(--progress-trackwidth, 9px);
    }
    path:last-child {
      stroke: var(--progress-color, lightgreen);
      stroke-width: var(--progress-width, 10px);
    }
    div {
      height: 100%;
      position: relative;
      width: 100%;
    }
    span {
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    button {
      border: none;
      background-color: rgba(0,0,0,0);
    }
  </style>
  <div style="width:60px;height:60px;--progress-color: {progressColor}">
    <svg viewBox="0 0 100 100">
      <path d="M50,5A45 45 0 1 1 49.9999 5" />
      <path d="{progressPath()}" />
    </svg>
    <div>
      <slot>
        {#if status === "cancel"}
        <span>취소</span>
        {:else if status === "complete"}
        <span>완료</span>
        {:else if Math.floor(diffSec / 60).toString().padStart(2, '0') >= 0 && (diffSec-Math.round(diffMin *60)).toString().padStart(2,'0') >= 0}
        <span> {Math.floor(diffSec / 60).toString().padStart(2, '0')}:{(diffSec-Math.round(diffMin *60)).toString().padStart(2,'0')} </span>
        {:else}
        <span><button on:click={()=>noShowMatching(matchingId)}>No Show</button></span>
        {/if}
      </slot>
    </div>
  </div>