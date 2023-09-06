<script>
	import TimeCell from './timeCell.svelte';
// @ts-nocheck
  import Fa from 'svelte-fa'
  import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

  let table_1=[
    {
      "time": "09:00~09:30",
      "name": "김xx"
    },
    {
      "time": "12:00~14:00",
      "name": "박xx"
    }
  ]
  let table_2=[
    {
      "time": "10:00~11:00",
      "name": "김xx"
    },
    {
      "time": "14:00~15:00",
      "name": "박xx"
    }
  ]
  
</script>
<h5 class="text-center fw-bold text-black-50">
    <Fa class="" icon={faCalendarDays} /> 
    2023년 5월 5일
</h5>

<table class="table table-borderless table-responsive">
    <thead class="text-center">
      <tr>
        <th scope="col" style="width: 70px;"></th>
        <th scope="col"class="border-bottom " >
            <p class="rounded text-white py-1" style="background: #FF9696;">테이블 1</p>
        </th>
        <th scope="col" class="border-bottom ">
            <p class="rounded text-white py-1" style="background: #9585F7;">테이블 2</p>
        </th>
        <th scope="col" class="border-bottom ">
            <p class="rounded text-white py-1"  style="background: #75DFAC;">테이블 3</p>
        </th>
        <th scope="col" class="border-bottom ">
            <p class="rounded text-white py-1" style="background: #FFB26D;">테이블 4</p>
        </th>
      </tr>
    </thead>
    <tbody>
    {#each {length: 12} as _, n}
     <!--  n:00~ n:30 -->
      <tr>
        <th scope="row"><p>{n+9}:00</p></th>
        <td>
          {#each table_1 as table }
            {#if n+9 == Number(table.time.split("~")[0].split(":")[0]) }
              <TimeCell background="#FFEAEA" border="#FF9696" name={table.name} time={table.time}/>
            {/if}
          {/each}

        </td>
        <td>
          {#each table_2 as table }
          {#if n+9 == Number(table.time.split("~")[0].split(":")[0]) }
            <TimeCell background="#EBE7FF" border="#9585F7" name={table.name} time={table.time}/>
          {/if}
        {/each}
        </td>
        <td></td>
        <td></td>
      </tr>
  <!--//  n:00~ n:30 -->
  <!--  n:30~ n+1:00 -->
      <tr>
        <th scope="row"></th>
        <td>
          {#each table_1 as table }
          {#if n+10 == Number(table.time.split("~")[1].split(":")[0]) }
          <TimeCell background="#FFEAEA" border="#FF9696" />
          {/if}
          {/each}
        </td>
        <td>
          {#each table_2 as table }
          {#if n+10 == Number(table.time.split("~")[1].split(":")[0]) }
          <TimeCell background="#EBE7FF" border="#9585F7" />
          {/if}
          {/each}
        </td>
        <td></td>
        <td></td>
      </tr>
<!--//  n:30~ n+1:00 -->
      {/each}
    </tbody>
  </table>

<style>
    table tbody th p{
        color:#999;
        margin-top:-17px
    }
    table tbody td{
        height:3rem;
        min-width: 180px !important;
        padding: 0;
    }
</style>


  
